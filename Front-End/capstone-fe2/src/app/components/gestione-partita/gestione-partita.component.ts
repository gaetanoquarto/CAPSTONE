import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { Notifica } from 'src/app/models/notifica.interface';
import { Partita } from 'src/app/models/partita.interface';
import { Utente } from 'src/app/models/utente.interface';
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

  constructor(private ar: ActivatedRoute, private parsrv: PartitaService, private storagesrv: StorageService, private usrsrv: UtenteService, private router: Router, private ntfsrv: NotificaService) { }

  ngOnInit(): void {
    this.ottieniPartita();
  }

  ottieniPartita(): void {
    let x = this.ar.snapshot.params["id"];
    console.log(x);
    this.parsrv.getPartitaById(x).subscribe(resp => {
      this.partita = resp
      this.verificaOrganizzatore(this.partita);
    });
  }

  eliminaPartita(partitaId: number): void {
    this.parsrv.eliminaPartita(partitaId).subscribe();
    this.router.navigateByUrl('/gioca')
  }

onsubmit(form: NgForm, partitaId: number) {
  console.log(form.value)
  if(form.valid) {
    let data = {
      id: this.partita!.id,
      centroSportivo : this.partita!.centroSportivo,
      campo : form.value.campo,
      organizzatore: this.partita!.organizzatore,
      nomePartita: form.value.nome,
      listaPartecipanti: this.partita!.listaPartecipanti,
      tipoPartita: form.value.tipo,
      giornoPartita: form.value.giorno,
      oraPartita: form.value.orario,
      citta: this.partita!.citta
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

}
