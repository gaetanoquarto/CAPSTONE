import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Provincia } from 'src/app/models/provincia.interface';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	arrayProvince: Provincia[] = [];

  constructor(private usrv: AuthService, private router: Router, private provsrv: ProvinciaService) { }

  ngOnInit(): void {
    this.getCitta();
  }

  getCitta(): void {
		this.provsrv.getProvince().subscribe(resp => {
      Object.assign(this.arrayProvince, resp);
    });
	}

  async onsubmit(form: NgForm) {
    let provincia: Provincia = JSON.parse(form.value.residenza)
   let data = {
    nome: form.value.nome,
    cognome: form.value.cognome,
    residenza: provincia,
    username: form.value.username,
    email: form.value.email,
    password: form.value.password
    }
    try {
      await this.usrv.register(data).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/login'])
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

}
