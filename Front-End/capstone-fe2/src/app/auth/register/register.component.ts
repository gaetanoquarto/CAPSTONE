import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  results: any[] = [];
	searchResults: any[] = [];

  constructor(private usrv: AuthService, private router: Router, private provsrv: ProvinciaService) { }

  ngOnInit(): void {
    this.getSearchResults();
  }

  getSearchResults(): void {
		this.provsrv.getProvince().subscribe(sr => {Object.assign(this.searchResults, sr);
    });
	}

	searchOnKeyUp(event: any) {
		let input = event.target.value;
		//console.log('event.target.value: ' + input);
		//console.log('this.searchResults: ' + this.searchResults);
		if (input.length > 1) {
			this.results = this.searchFromArray(this.searchResults, input);
		}
	}

	searchFromArray(arr: any[], regex: any) {
		let matches = [], i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i].provincia.match(regex)) {
				matches.push(arr[i]);
			}
		}
		console.log('matches: ' + matches);
		return matches;
	};

  async onsubmit(form: NgForm) {
    try {
      await this.usrv.register(form.value).subscribe({
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
