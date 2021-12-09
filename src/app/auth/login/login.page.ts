import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import {FirebaseAuth} from '../../class/firebase-auth';
import { Router } from  "@angular/router";
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	
	constructor(public fireAuth : FirebaseAuth, private router: Router) {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		this.darkMode = prefersDark.matches;
		document.body.classList.toggle('dark');
	 }
	darkMode: boolean = true;

	public user = {
		email: "admin@gmail.com",
		password: "123456"
	}

	ngOnInit() {
		this.loggingIn  = false;
	}
	loggingIn = false;
	logIn(event){
		console.info(this.user);
		localStorage.setItem("email", this.user.email);
		this.loggingIn = true;
		this.fireAuth.login(this.user).then(success =>{
			this.loggingIn = false;
			AuthServiceService.usuario.length = 0;
			AuthServiceService.usuario.push(this.user.email);
			this.router.navigate(['/tabs/tab1']);
			//this.router.navigate(['/component', this.user.email]);
			//localStorage.setItem("nombre", );
		}).catch(err=>{
			//this.router.navigate(['/tabs/tab1']);
		});
		
	}



	usuario(event){
		console.log(event);
		//alert(event.detail.value);
		this.user.email = event.detail.value;
	}

}
