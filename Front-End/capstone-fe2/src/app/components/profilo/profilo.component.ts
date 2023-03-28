import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs';
import { StorageService } from 'src/app/auth/storage.service';
import { Notifica } from 'src/app/models/notifica.interface';
import { Utente } from 'src/app/models/utente.interface';
import { NotificaService } from 'src/app/services/notifica.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {

  utente: Utente | undefined
  idPrec: any;
  loggato: boolean = false;
  idLoggato: number | undefined;
  richiesta: boolean = false;
  utenteLoggato: Utente | undefined;

  constructor(private ar: ActivatedRoute, private usrsrv: UtenteService, private storagesrv: StorageService, private notsrv: NotificaService) { }

  ngOnInit(): void {
    this.ottieniUtente();
  }


  ottieniUtenteLoggato() {
    this.idLoggato = this.storagesrv.getUser().id;
    this.usrsrv.getUtente(this.idLoggato!).subscribe(resp => {
      console.log(resp);
      this.utenteLoggato = resp;
      console.log(this.utenteLoggato);
      let checkAmico = this.utenteLoggato?.listaAmici.filter(p => p.idUtente === this.utente?.id);
      console.log(checkAmico);
      if(checkAmico.length !== 0) {
        this.richiesta = true;
      } else {
        this.richiesta = false;
      }
    })
    if(this.idLoggato === this.utente?.id) {
      this.loggato = true;
    } else {
      this.loggato = false;
    }

  }

  ottieniUtente(): void {
    let x = this.ar.snapshot.params["id"];
      this.usrsrv.getUtente(x).subscribe( resp => {
        this.utente = resp;
        console.log(this.utente);
        this.ottieniUtenteLoggato();
      })
    }

    inviaAmicizia(): void {
      let notifica: Partial<Notifica> = {
        tipoNotifica: "RICHIESTA_AMICIZIA",
        idMittente: this.idLoggato!,
        idDestinatario: this.utente!.id
      }
      this.notsrv.creaNotifica(notifica).subscribe(resp => {
        console.log(resp);
        this.utente?.notifiche.push(resp);
        this.usrsrv.aggiornaUtente(this.utente!.id, this.utente!).subscribe(resp => {
          this.ottieniUtente();
        })
      })
    }
  }
