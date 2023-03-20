import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { Campo } from 'src/app/models/campo.interface';
import { CentroSportivo } from 'src/app/models/centro-sportivo.interface';
import { Provincia } from 'src/app/models/provincia.interface';
import { Utente } from 'src/app/models/utente.interface';
import { CentroSportivoService } from 'src/app/services/centro-sportivo.service';
import { PartitaService } from 'src/app/services/partita.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
  selector: 'app-crea-partita',
  templateUrl: './crea-partita.component.html',
  styleUrls: ['./crea-partita.component.scss']
})
export class CreaPartitaComponent implements OnInit {

  arrayProvince: Provincia[] = [];
  mostraForm: boolean = false;
  listaCentriSportivi: CentroSportivo[] = [];
  listaCampi: Campo[] = [];
  centroSportivoSelezionato: any| undefined;
  user: Utente[] = [];
  listaPartecipanti: any[] = [];

  constructor(private prtsrv: PartitaService, private router: Router,private cssrv: CentroSportivoService, private provsrv: ProvinciaService, private storagesrv: StorageService, private usrsrv: UtenteService) { }

  ngOnInit(): void {
    this.getOrganizzatore();
    this.getProvince();
    this.getCampiFromCentri();
  }

  trovaCentri(form: NgForm) {
    this.listaCentriSportivi = [];
    console.log(form.value);
    let provincia: Provincia = JSON.parse(form.value.citta)
    console.log(provincia);
    this.cssrv.getCentriSportiviCitta(provincia.id).subscribe(resp => {
      console.log(resp);
      Object.assign(this.listaCentriSportivi, resp)
      this.mostraForm = true;
    })
  }

  getCampiFromCentri(): void {
    if(this.centroSportivoSelezionato) {
      let centroSportivo: CentroSportivo = JSON.parse(this.centroSportivoSelezionato);
    this.listaCampi = centroSportivo.listaCampi;
    }

  }

  getProvince() {
    this.provsrv.getProvince().subscribe(resp => {
      Object.assign(this.arrayProvince, resp);
    })
  }

  getOrganizzatore(): void {
    const userId = this.storagesrv.getUser().id;
  this.usrsrv.getUtente(userId).subscribe(resp => {
    this.user = resp;
    console.log(this.user);
    this.listaPartecipanti.push(resp);
    console.log(this.listaPartecipanti);

  })
}

  async onsubmit(form: NgForm) {
    let CentriSportivi: CentroSportivo = JSON.parse(form.value.centroSportivo);
   let data = {
    centroSportivo: CentriSportivi,
    campo: form.value.campo,
    organizzatore: this.user,
    nomePartita: form.value.nome,
    tipoPartita: form.value.tipo,
    giornoPartita: form.value.giorno,
    oraPartita: form.value.orario,
    listaPartecipanti: this.listaPartecipanti,
    citta: CentriSportivi.cittaCentroSportivo.provincia
   }
    try {
      console.log(data);
      await this.prtsrv.creaPartita(data).subscribe({
        next: data => {
          console.log(data);
          form.reset();
          this.router.navigate(['/gioca'])
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

}
