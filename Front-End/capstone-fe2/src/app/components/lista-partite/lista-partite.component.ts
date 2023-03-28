import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Partita } from 'src/app/models/partita.interface';
import { Provincia } from 'src/app/models/provincia.interface';
import { Utente } from 'src/app/models/utente.interface';
import { PartitaService } from 'src/app/services/partita.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UtenteService } from 'src/app/services/utente.service';


@Component({
  selector: 'app-lista-partite',
  templateUrl: './lista-partite.component.html',
  styleUrls: ['./lista-partite.component.scss']
})
export class ListaPartiteComponent implements OnInit {

  arrayProvince: Provincia[] = [];
  residenzaSelezionata: any;
  arrayPartite: Partita[] = [];
  vuoto: boolean = false;
  listaPartecipanti: any[] = [];
  selezioneCitta: any;
  user: any = null;
  partecipanteEsistente: any;
  numeroPartecipanti: any;
  nMaxPartecipanti: any;
  organizzatore: any;
  datiOrganizzatore: Utente | undefined;



  todayDate: string = "";

  constructor(private storagesrv: StorageService, private provsrv: ProvinciaService, private usrsrv: UtenteService, private parsrv: PartitaService) { }

  ngOnInit(): void {
    this.getCitta();
  }

  getTodayDate(): void {
    const date = new Date();
    const todayDay = date.getDate();
    const todayMonth = date.getMonth() + 1;
    const todayYear = date.getFullYear();

    this.todayDate = `${todayYear}-${todayMonth.toString().padStart(2, '0')}-${todayDay.toString().padStart(2, '0')}`
  }

  getCitta(): void {
    this.provsrv.getProvince().subscribe(resp => {
      Object.assign(this.arrayProvince, resp);
    });
    this.utenteLoggato();
  }

  getPartite(): void {
    if (this.residenzaSelezionata) {
      this.parsrv.getListaPartiteFilter(this.residenzaSelezionata.provincia, this.todayDate).subscribe(resp => {
        if (resp.length == 0) {
          this.vuoto = true;
        } else {
          this.arrayPartite = [];
          this.arrayPartite = resp;
          this.checkPartecipanti(this.arrayPartite)
          this.vuoto = false;
        }
      })
    }
  }


  checkPartecipanti(partite: Partita[]): void {
    console.log(partite);
    for (let i = 0; i < partite.length; i++) {
      this.partecipanteEsistente = partite[i].listaPartecipanti.find(p => p.id === this.user.id)
      this.conteggioPartecipanti(partite[i].listaPartecipanti);
      console.log(partite[i].organizzatore)
      this.organizzatore = partite[i].organizzatore === this.user.username;
      let datiOrganizzatore = partite[i].listaPartecipanti.find(p => p.username === partite[i].organizzatore);
      console.log(datiOrganizzatore);
      this.getDatiOrganizzatore(datiOrganizzatore?.id);
    }
  }

  getDatiOrganizzatore(organizzatore: any) {
      this.usrsrv.getUtente(organizzatore).subscribe(resp => {
        this.datiOrganizzatore = resp;
      })
  }

  eliminaPartita(partitaId: number): void {
    this.parsrv.eliminaPartita(partitaId).subscribe();
    this.utenteLoggato();
  }

  annullaPrenotazione(partitaId: number) {
    this.parsrv.getPartitaById(partitaId).subscribe(resp => {
      let partita: Partita = resp;
      partita.listaPartecipanti = partita.listaPartecipanti.filter(p => p.id !== this.user.id);
      console.log(partita);
      this.parsrv.aggiornaPartita(partitaId, partita).subscribe(resp => console.log(resp));
      this.partecipanteEsistente = partita.listaPartecipanti.find(p => p.id === this.user.id);
      this.conteggioPartecipanti(partita.listaPartecipanti)
    })

  }

  partecipaPartita(partitaId: number): void {
    console.log(partitaId)
    this.parsrv.getPartitaById(partitaId).subscribe(resp => {
      let partita: Partita = resp;
      console.log(partita.listaPartecipanti)
      this.partecipanteEsistente = partita.listaPartecipanti.find(p => p.id === this.user.id);
      if (this.partecipanteEsistente) {
        console.log("utente già esistente")
        return;
      } else {
        console.log(this.user);
        let senzaLista = this.user;
        delete senzaLista.listaAmici
        partita.listaPartecipanti.push(senzaLista);
        this.parsrv.aggiornaPartita(partitaId, partita).subscribe(resp => console.log(resp));
        this.partecipanteEsistente = partita.listaPartecipanti.find(p => p.id === this.user.id);
        this.conteggioPartecipanti(partita.listaPartecipanti)
      }
    })
  }

  utenteLoggato(): void {
    const userId = this.storagesrv.getUser().id;
    this.usrsrv.getUtente(userId).subscribe(resp => {
      this.user = resp;
      console.log(this.user);
      this.getTodayDate();
      this.ottieniResidenza();
    })

  }

  conteggioPartecipanti(obj: any): number {
    return this.numeroPartecipanti = Object.keys(obj).length;
  }

  ottieniResidenza(): void {
    let residenza = this.arrayProvince.find(prov => prov.id === this.user.residenza.id);
    console.log(residenza)
    this.residenzaSelezionata = residenza;
    console.log(this.residenzaSelezionata)
    this.getPartite();
  }
}




