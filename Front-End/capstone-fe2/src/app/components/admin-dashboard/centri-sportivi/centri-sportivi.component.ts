import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Campo } from 'src/app/models/campo.interface';
import { CentroSportivo } from 'src/app/models/centro-sportivo.interface';
import { Provincia } from 'src/app/models/provincia.interface';
import { CentroSportivoService } from 'src/app/services/centro-sportivo.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-centri-sportivi',
  templateUrl: './centri-sportivi.component.html',
  styleUrls: ['./centri-sportivi.component.scss']
})
export class CentriSportiviComponent implements OnInit {

  listaCampi: Campo[] = [];
  campiAssociati: Campo[] = [];
	arrayProvince: Provincia[] = [];
  listaCentriSportivi: CentroSportivo[] = [];

  constructor(private cssrv: CentroSportivoService, private provsrv: ProvinciaService) { }

  ngOnInit(): void {
    this.getCampi();
    this.getCitta();
    this.getCentriSportivi();
  }

  getCitta(): void {
		this.provsrv.getProvince().subscribe(resp => {
      Object.assign(this.arrayProvince, resp);
    });
	}

  getCampi(): void {
    this.cssrv.getCampi().subscribe(resp => {
      console.log(resp);
      this.listaCampi = resp;
    })
  }

  getCentriSportivi(): void {
    this.cssrv.getCentriSportivi().subscribe(resp => {
      this.listaCentriSportivi = resp;
      console.log(this.listaCentriSportivi)
    })
  }

  Checkboxes(form: NgForm) {
    if(form.value.CALCIOA5) {
      this.campiAssociati.push(this.listaCampi[0])
    }
    if(form.value.CALCIOA6) {
      this.campiAssociati.push(this.listaCampi[1])
    }
    if(form.value.CALCIOA7) {
      this.campiAssociati.push(this.listaCampi[2])
    }
  }

  async onsubmit(form: NgForm) {
    this.Checkboxes(form);
    let provincia: Provincia = JSON.parse(form.value.provincia)
   let data = {
    nomeCentroSportivo: form.value.nome,
    cittaCentroSportivo: provincia,
    indirizzo: form.value.indirizzo,
    listaCampi: this.campiAssociati
    }
    try {
      console.log(data);
      await this.cssrv.creaCentroSportivo(data).subscribe({
        next: data => {
          console.log(data);
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

}
