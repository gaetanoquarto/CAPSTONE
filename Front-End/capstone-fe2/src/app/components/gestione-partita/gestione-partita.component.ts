import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { Campo } from 'src/app/models/campo.interface';
import { Chat } from 'src/app/models/chat.interface';
import { Messaggio } from 'src/app/models/messaggio.interface';
import { Notifica } from 'src/app/models/notifica.interface';
import { Partita } from 'src/app/models/partita.interface';
import { Utente } from 'src/app/models/utente.interface';
import { ChatService } from 'src/app/services/chat.service';
import { MessaggioService } from 'src/app/services/messaggio.service';
import { NotificaService } from 'src/app/services/notifica.service';
import { PartitaService } from 'src/app/services/partita.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
  selector: 'app-gestione-partita',
  templateUrl: './gestione-partita.component.html',
  styleUrls: ['./gestione-partita.component.scss']
})
export class GestionePartitaComponent implements OnInit {

  partita: Partita | undefined;
  numeroPartecipanti: any;
  organizzatore: boolean = false;
  partecipanteEsistente: boolean = false;
  userId: number | undefined;
  utente: any;
  datiPartita: boolean = true;
  alCompleto: boolean = false;
  esiste: boolean = false;
  invitatoConSuccesso: boolean = false;
  bacheca: Chat | undefined;
  usernameChat: string | undefined;
  listaCampi: Campo[] | undefined = [];
  listaUtenti: Utente[] | undefined = [];


  constructor(private ar: ActivatedRoute, private parsrv: PartitaService, private storagesrv: StorageService, private usrsrv: UtenteService, private router: Router, private ntfsrv: NotificaService, private messrv: MessaggioService, private chatsrv: ChatService) { }

  ngOnInit(): void {
    this.ottieniPartita();
    this.getCampi();
    this.ottieniUtenti();
  }

  ottieniPartita(): void {
    let x = this.ar.snapshot.params["id"];
    console.log(x);
    this.parsrv.getPartitaById(x).subscribe(resp => {
      this.partita = resp
      this.verificaOrganizzatore(this.partita);
      this.ottieniMessaggi();
    });
  }

  eliminaPartita(partitaId: number): void {
      this.parsrv.eliminaPartita(partitaId).subscribe(() => {
        this.chatsrv.eliminaChat(this.bacheca!.id).subscribe()
        this.router.navigateByUrl('/gioca')
      });

  }

onsubmit(form: NgForm, partitaId: number) {
  console.log(form.value)
  if(form.valid) {
    let data: Partita = {
      id: this.partita!.id,
      centroSportivo : this.partita!.centroSportivo,
      campo : form.value.campo,
      organizzatore: this.partita!.organizzatore,
      nomePartita: form.value.nome,
      listaPartecipanti: this.partita!.listaPartecipanti,
      tipoPartita: form.value.tipo,
      giornoPartita: form.value.giorno,
      oraPartita: form.value.orario,
      citta: this.partita!.citta,
      chat: this.partita!.chat
    }
    console.log(data);
    this.parsrv.aggiornaPartita(partitaId, data).subscribe(resp => {
      console.log(resp);
      this.toggleDati();
    })
  }
}

toggleDati(): void {
  if(this.datiPartita) {
    this.datiPartita = false;
  } else {
    this.datiPartita = true;
  }
}

checkAlCompleto(): void {
 if(this.partita?.campo === 'CALCIOA5') {
  if(this.partita.listaPartecipanti.length < 10) {
    this.alCompleto = false;
  } else {
    this.alCompleto = true;
  }
 } else if(this.partita?.campo === 'CALCIOA6') {
  if(this.partita.listaPartecipanti.length < 12) {
    this.alCompleto = false;
  } else {
    this.alCompleto = true;
  }
 } else if(this.partita?.campo === 'CALCIOA7') {
  if(this.partita.listaPartecipanti.length < 14) {
    this.alCompleto = false;
  } else {
    this.alCompleto = true;
  }
 }
}

  conteggioPartecipanti(obj: any): number {
    return this.numeroPartecipanti = Object.keys(obj).length;
  }

  verificaOrganizzatore(partita: Partita) {
    this.userId = this.storagesrv.getUser().id;
    let organizzatore = partita.organizzatore;
    this.usrsrv.getUtente(this.userId!).subscribe(u => {
       this.utente = u
       if (this.utente.username === organizzatore) {
        this.organizzatore = true;
      }
      console.log(this.organizzatore);
      this.checkPartecipante(this.userId!, partita)
      });

  }

  checkPartecipante(userId: number, partita: Partita): void {
    let partecipante = partita.listaPartecipanti.find(p => p.id === userId);
    if (partecipante) {
      this.partecipanteEsistente = true;
    } else {
      this.partecipanteEsistente = false;
    }
  }



  annullaPrenotazione(partitaId: number) {
    this.parsrv.getPartitaById(partitaId).subscribe(resp => {
      let partita: Partita = resp;
      partita.listaPartecipanti = partita.listaPartecipanti.filter(p => p.id !== this.userId);
      console.log(partita);
      this.parsrv.aggiornaPartita(partitaId, partita).subscribe(resp => {
        console.log(resp)
        this.checkPartecipante(this.userId!, partita)
        this.conteggioPartecipanti(partita.listaPartecipanti)
        this.ottieniPartita()
      });
    })
  }

  rimuoviUtente(partitaId: number, utenteId: number) {
    this.parsrv.getPartitaById(partitaId).subscribe(resp => {
      let partita: Partita = resp;
      partita.listaPartecipanti = partita.listaPartecipanti.filter(p => p.id !== utenteId);
      console.log(partita);
      this.parsrv.aggiornaPartita(partitaId, partita).subscribe(resp => {
        console.log(resp)
        this.conteggioPartecipanti(partita.listaPartecipanti)
        this.ottieniPartita()
      });
    })
  }

  invitaUtente(utenteId: number) {
    console.log(this.partita);
    let utenteEsistente = this.partita?.listaPartecipanti.find(u => u.id === utenteId);
    console.log(utenteEsistente);
    if(utenteEsistente) {
      this.esiste = true;
      this.invitatoConSuccesso = false;
    } else {
      let notifica: Partial<Notifica> = {
        tipoNotifica: "INVITO_PARTITA",
        idMittente: this.utente.id,
        idDestinatario: utenteId,
        partita: this.partita
      }
      this.ntfsrv.creaNotifica(notifica).subscribe( res => {
        console.log(res)
        this.usrsrv.getUtente(utenteId).subscribe(utente => {
          utente.notifiche.push(res)
      this.usrsrv.aggiornaUtente(utente.id, utente).subscribe(res => console.log(res))
      this.esiste = false;
      this.invitatoConSuccesso = true;
      })
        })
    }

  }

  partecipaPartita(partitaId: number): void {
    this.parsrv.getPartitaById(partitaId).subscribe(resp => {
      let partita: Partita = resp;
      let partecipante
      partecipante = partita.listaPartecipanti.find(p => p.id === this.userId);
      if (partecipante) {
        console.log("utente già esistente")
        return;
      } else {
        partita.listaPartecipanti.push(this.utente);
        this.parsrv.aggiornaPartita(partitaId, partita).subscribe(resp => {
          console.log(resp)
          this.checkPartecipante(this.userId!, partita)
          this.ottieniPartita()
          this.conteggioPartecipanti(partita.listaPartecipanti)
        });
      }
    })
  }


  ConvertTo2Digits(newNum: number) {
    return newNum.toString().padStart(2, '0');
}

ottieniData(data: Date) {
 return([ data.getDate(),
  this.ConvertTo2Digits(data.getMonth() + 1),
  this.ConvertTo2Digits(data.getFullYear())
].join('-'))
}

ottieniOra(orario: Date) {
  return([
    this.ConvertTo2Digits(orario.getHours()),
          this.ConvertTo2Digits(orario.getMinutes())
  ].join(':')
  )
}

  ottieniMessaggi() {
    this.chatsrv.getChat(this.partita!.chat.id).subscribe(resp => {
      this.bacheca = resp;
      console.log(this.bacheca)
    })
  }

  invioMessaggio(messaggio: string) {
    if(messaggio !== '') {
      let date = this.ottieniData(new Date);
    let ora = this.ottieniOra(new Date);
    let data: Partial<Messaggio> = {
      id_Utente: this.utente.id,
      username_Utente: this.utente.username,
      messaggio: messaggio,
      data: date,
      ora: ora
    }
    console.log(data);
    this.messrv.creaMessaggio(data).subscribe(mex => {
      this.chatsrv.getChat(this.partita!.chat.id).subscribe(chat => {
        chat.messaggi.push(mex)
        console.log(chat)
        this.chatsrv.aggiornaChat(chat.id, chat).subscribe(resp => {
          console.log(resp);
          this.bacheca = resp;
        })
      })
    })
    }
  }

  ottieniUtenti() {
    this.usrsrv.getUtenti().subscribe(resp => {
      this.listaUtenti = resp;
    })
  }

  ottieniImmagineProfilo(idUtenteMessaggio: number): any {
      let utente = this.listaUtenti?.find(u => u.id === idUtenteMessaggio);
      if(utente?.immagineProfilo !== null) {
        return utente!.immagineProfilo;
      } else {
        return 'assets/img/sample-user.png';
      }
  }

  getCampi() {
    this.parsrv.getListaCampi().subscribe(resp => {
      this.listaCampi = resp;
    })
  }

}
