import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Partita } from 'src/app/models/partita.interface';
import { Utente } from 'src/app/models/utente.interface';
import { ListaAmiciService } from 'src/app/services/lista-amici.service';
import { NotificaService } from 'src/app/services/notifica.service';
import { PartitaService } from 'src/app/services/partita.service';
import { UtenteService } from 'src/app/services/utente.service';
import { Amico } from '../../models/amico.interface';

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
  loggedIn: boolean = false;

  constructor(private usrsrv: UtenteService, private route: Router, public storagesrv: StorageService, private nsrv: NotificaService, private amicisrv: ListaAmiciService, private parsrv: PartitaService, public authsrv: AuthService) { }

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
  //cicla sulla lista notifiche dell'utente
    for (let i = 0; i < this.utenteLoggato!.notifiche.length; i++) {
      //se non ci sono notifiche
      if(this.utenteLoggato?.notifiche.length === 0) {
        //la variabile listaNotifiche resta vuota
        this.listaNotifiche = [];
      } else {
      //altrimenti recupera l'id del mittente delle notifiche
        let idMittente = this.utenteLoggato?.notifiche[i].idMittente;
        //recuperami l'utente mittente
        this.usrsrv.getUtente(idMittente!).subscribe(resp => {
          //se l'id del mittente è uguale all'id dell'utente recuperato
          if (idMittente === resp.id) {
            //creami un oggetto con il nome di quell'utente e la sua notifica e inseriscila nell'array listaNotifiche
            this.listaNotifiche.push({
              usernameMittente: resp.username,
              notifica: this.utenteLoggato?.notifiche.filter(n => n.idMittente === resp.id)
            })
            console.log(this.listaNotifiche)
            //se l'array listaNotifiche ha qualcosa all'interno
            if (this.listaNotifiche.length !== 0) {
              //settami il boolean pieno in true
              this.pieno = true;
            }
          }
        })
      }
    }
  }

  accettaAmicizia(idMittente: number, idNotifica: number, i: number) {
    //se esiste l'idMittente
    if (idMittente) {
      //recuperami l'utente per intero
      this.usrsrv.getUtente(idMittente).subscribe(mittenteObj => {
        //creami un data amico per l'utente loggato
        let data: Partial<Amico> = {
          idUtente: mittenteObj.id,
          username: mittenteObj.username
        }
        //creami un altro data amico per il mittente
        let data2: Partial<Amico> = {
          idUtente: this.utenteLoggato?.id,
          username: this.utenteLoggato?.username
        }
        //recuperami la lista completa degli amici
        this.amicisrv.getAllAmici().subscribe(resp => {
          console.log(resp);
          //controlla se questi utenti esistono già nel database
          let mittente: Amico = resp.find((p: Amico) => p.idUtente === data.idUtente);
          let utenteLoggato: Amico = resp.find((p: Amico) => p.idUtente === data2.idUtente);
          console.log("mittente: " + mittente.username)
          console.log("utenteLoggato: " + utenteLoggato!.username)
          //se esiste pusha semplicemente l'oggetto all'interno della lista amici del mittente
          if (utenteLoggato) {
            mittenteObj.listaAmici.push(utenteLoggato);
            this.usrsrv.aggiornaUtente(mittenteObj.id, mittenteObj).subscribe(resp => {
              console.log(this.listaNotifiche[i].notifica)
            this.listaNotifiche.splice(i, 1)
             console.log(this.listaNotifiche);
              this.ottieniUtente();
            });
          } else {
            //altrimenti creami un oggetto amico e poi pushalo
            this.amicisrv.creaAmico(data2).subscribe(resp => {
              mittenteObj.listaAmici.push(resp);
              this.usrsrv.aggiornaUtente(mittenteObj.id, mittenteObj).subscribe(resp => {
                this.ottieniUtente();
              });
            })
          }
          //stessa cosa di sopra ma per l'utente collegato
          if (mittente) {
            this.utenteLoggato?.listaAmici.push(mittente);
            //mi rimuovi la notifica dall'utente loggato
            let rimuoviNotifica: any = this.utenteLoggato?.notifiche.findIndex(p => p.id === idNotifica);
            this.utenteLoggato?.notifiche.splice(rimuoviNotifica, 1);
            //mandi nel database l'utente senza la notifica
            this.usrsrv.aggiornaUtente(this.utenteLoggato!.id, this.utenteLoggato!).subscribe(resp => {
              console.log(resp)
              this.nsrv.eliminaNotifica(idNotifica).subscribe( resp => {
                //rimuovi la notifica dall'array
                this.listaNotifiche.splice(i, 1)
                console.log(this.listaNotifiche);
                this.ottieniUtente();
                //se non ci sono notifiche nell'array, mi setti il boolean "pieno" in falso
                if(this.listaNotifiche.length === 0) {
                  this.pieno = false
                }
              });
            });
          } else {
            //------
            this.amicisrv.creaAmico(data).subscribe(resp => {
              this.utenteLoggato?.listaAmici.push(resp);
              let rimuoviNotifica: any = this.utenteLoggato?.notifiche.findIndex(p => p.id === idNotifica);
            this.utenteLoggato?.notifiche.splice(rimuoviNotifica, 1);
              this.usrsrv.aggiornaUtente(this.utenteLoggato!.id, this.utenteLoggato!).subscribe(resp => {
                this.nsrv.eliminaNotifica(idNotifica).subscribe( resp => {
                  this.listaNotifiche.splice(i, 1)
                  console.log(this.listaNotifiche);
                  this.ottieniUtente();
                  if(this.listaNotifiche.length === 0) {
                    this.pieno = false
                  }
                });
              })
            })
          }
          this.amAccettata = true;
        })
      })
    }
  }

  accettaInvitoPartita(partita: Partita, notificaId: number, i: number) {

    let rimuoviNotifica: any = this.utenteLoggato?.notifiche.findIndex(p => p.id === notificaId);
    this.utenteLoggato!.notifiche.splice(rimuoviNotifica, 1)
    console.log(this.utenteLoggato);
      this.usrsrv.aggiornaUtente(this.utenteLoggato!.id, this.utenteLoggato!).subscribe(utenteAggiornato => {
        partita.listaPartecipanti.push(utenteAggiornato)
        this.parsrv.aggiornaPartita(partita.id, partita).subscribe(resp => {
          console.log(resp);
          this.parAccettata = true;
          this.nsrv.eliminaNotifica(notificaId).subscribe()
          this.listaNotifiche.splice(i, 1)
          if(this.listaNotifiche.length === 0) {
            this.pieno = false
          }
      })
    });
  }

  rifiutaAmicizia(notificaId: number, i: number) {
    let rimuoviNotifica: any = this.utenteLoggato?.notifiche.findIndex(p => p.id === notificaId);
    this.utenteLoggato!.notifiche.splice(rimuoviNotifica, 1)
    this.usrsrv.aggiornaUtente(this.utenteLoggato!.id, this.utenteLoggato!).subscribe(resp => {
      this.nsrv.eliminaNotifica(notificaId).subscribe(resp => console.log(resp));
      this.listaNotifiche.splice(i, 1);
      if(this.listaNotifiche.length === 0) {
        this.pieno = false
      }
    })
  }

  rifiutaInvitoPartita(notificaId: number, i: number) {
    let rimuoviNotifica: any = this.utenteLoggato?.notifiche.findIndex(p => p.id === notificaId);
    this.utenteLoggato!.notifiche.splice(rimuoviNotifica, 1)
    this.usrsrv.aggiornaUtente(this.utenteLoggato!.id, this.utenteLoggato!).subscribe(resp => {
      this.nsrv.eliminaNotifica(notificaId).subscribe(resp => console.log(resp));
      this.listaNotifiche.splice(i, 1)
      if(this.listaNotifiche.length === 0) {
        this.pieno = false
      }
    })
  }


   ottieniUtente() {
    let userId = this.storagesrv.getUser().id;
    if(userId) {
      this.authsrv.isLoggedIn = true;
      this.usrsrv.getUtente(userId).subscribe(resp => {
        console.log(resp);
        this.utenteLoggato = resp;
        this.ottieniNotifiche();
      })
    }
  }

  redirectToProfile() {
    let userId = this.storagesrv.getUser().id;
    console.log(userId)
      this.route.navigateByUrl(`/user/${userId}`);
  }

  logout() {
    this.authsrv.logout();
    this.authsrv.isLoggedIn = false;
    this.route.navigateByUrl('/login');
  }

}
