import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { Partita } from 'src/app/models/partita.interface';
import { Utente } from 'src/app/models/utente.interface';
import { ListaAmiciService } from 'src/app/services/lista-amici.service';
import { NotificaService } from 'src/app/services/notifica.service';
import { PartitaService } from 'src/app/services/partita.service';
import { UtenteService } from 'src/app/services/utente.service';
import { Amico } from '../../models/amico.interface';
import { UtenteAmico } from '../../models/utente-amico.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  utenti: Utente[] = [];
  utenteLoggato: Utente | undefined;
  listaNotifiche: any[] = [];
  pieno: boolean = false;
  amAccettata: boolean = false;
  parAccettata: boolean = false;

  constructor(private usrsrv: UtenteService, private route: Router, private storagesrv: StorageService, private nsrv: NotificaService, private amicisrv: ListaAmiciService, private parsrv: PartitaService) { }

  ngOnInit(): void {
    this.ottieniUtente();
  }

  ricercaUtenti(event: any) {
    const query = event.target.value;
    if (query) {
      this.usrsrv.searchUtente(query).subscribe(resp => {
        console.log(resp);
        this.utenti = resp;
      })
    } else {
      this.utenti = [];
    }
  }

  selezioneUtente(utenteId: number) {
    this.utenti = [];
    this.route.navigateByUrl(`user/${utenteId}`);
  }

  ottieniNotifiche() {
    for (let i = 0; i < this.utenteLoggato!.notifiche.length; i++) {
      if(this.utenteLoggato?.notifiche.length === 0) {
        this.listaNotifiche = [];
      } else {
        let idMittente = this.utenteLoggato?.notifiche[i].idMittente;
        this.usrsrv.getUtente(idMittente!).subscribe(resp => {
          if (idMittente === resp.id) {
            this.listaNotifiche.push({
              usernameMittente: resp.username,
              notifica: this.utenteLoggato?.notifiche.filter(n => n.idMittente === resp.id)
            })
            console.log(this.listaNotifiche)
            if (this.listaNotifiche.length !== 0) {
              this.pieno = true;
            }
          }
        })
      }
    }
  }

  accettaAmicizia(idMittente: number, idNotifica: number) {
    if (idMittente) {
      this.usrsrv.getUtente(idMittente).subscribe(mittenteObj => {
        let data: Partial<Amico> = {
          idUtente: mittenteObj.id,
          username: mittenteObj.username
        }
        let data2: Partial<Amico> = {
          idUtente: this.utenteLoggato?.id,
          username: this.utenteLoggato?.username
        }
        this.amicisrv.getAllAmici().subscribe(resp => {
          console.log(resp);
          let mittente: Amico = resp.find((p: Amico) => p.idUtente === data.idUtente);
          let utenteLoggato: Amico = resp.find((p: Amico) => p.idUtente === data2.idUtente);
          console.log("mittente: " + mittente.username)
          console.log("utenteLoggato: " + utenteLoggato.username)
          if (utenteLoggato) {
            mittenteObj.listaAmici.push(utenteLoggato);
            this.usrsrv.aggiornaUtente(mittenteObj.id, mittenteObj).subscribe(resp => console.log(resp));
          } else {
            this.amicisrv.creaAmico(data2).subscribe(resp => {
              mittenteObj.listaAmici.push(resp);
              this.usrsrv.aggiornaUtente(mittenteObj.id, mittenteObj).subscribe(resp => console.log(resp));
            })
          }

          if (mittente) {
            this.utenteLoggato?.listaAmici.push(mittente);
            let rimuoviNotifica: any = this.utenteLoggato?.notifiche.findIndex(p => p.id === idNotifica);
            this.utenteLoggato?.notifiche.splice(rimuoviNotifica, 1);
            this.usrsrv.aggiornaUtente(this.utenteLoggato!.id, this.utenteLoggato!).subscribe(resp => {
              console.log(resp)
              this.ottieniUtente();

            });
          } else {
            this.amicisrv.creaAmico(data).subscribe(resp => {
              this.utenteLoggato?.listaAmici.push(resp);
              let rimuoviNotifica: any = this.utenteLoggato?.notifiche.findIndex(p => p.id === idNotifica);
              this.utenteLoggato?.notifiche.splice(rimuoviNotifica, 1)
              this.usrsrv.aggiornaUtente(this.utenteLoggato!.id, this.utenteLoggato!).subscribe(resp => {
                this.ottieniUtente();
              })
            })
          }
          this.amAccettata = true;
        })
      })
    }
  }

  accettaInvitoPartita(partita: Partita, notificaId: number) {

    let rimuoviNotifica: any = this.utenteLoggato?.notifiche.findIndex(p => p.id === notificaId);
    this.utenteLoggato!.notifiche.splice(rimuoviNotifica, 1)
    console.log(this.utenteLoggato);
      this.usrsrv.aggiornaUtente(this.utenteLoggato!.id, this.utenteLoggato!).subscribe(utenteAggiornato => {
        partita.listaPartecipanti.push(utenteAggiornato)
        this.parsrv.aggiornaPartita(partita.id, partita).subscribe(resp => {
          console.log(resp);
          this.parAccettata = true;
      })
    });

  }


  ottieniUtente() {
    let userId = this.storagesrv.getUser().id;
    this.usrsrv.getUtente(userId).subscribe(resp => {
      console.log(resp);
      this.utenteLoggato = resp;
      this.ottieniNotifiche();
    })
  }

}
