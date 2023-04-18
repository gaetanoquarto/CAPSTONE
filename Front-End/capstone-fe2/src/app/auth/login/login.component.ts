import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(public usrsrv: AuthService, private router: Router, public storageService: StorageService) { }

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  async onsubmit(form: NgForm) {
    try {
      await this.usrsrv.login(form.value).subscribe({
        next: data => {
          this.storageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.usrsrv.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          // this.storageService.loggedId = data.id;
          // console.log(this.storageService.loggedId)
          this.router.navigate(['/gioca'])
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

}

