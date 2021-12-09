import { Component } from '@angular/core';
import { FirebaseAuth } from '../class/firebase-auth';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public fireauth : FirebaseAuth) {}

  fotos = new Array();

  isLikedByThisUser = false;
  email = AuthServiceService.usuario;
  ngOnInit() {
    //this.email = localStorage.getItem("email");

    this.fireauth.getImages(this.fotos, this.email);

    /*.then(succeedData => {
      this.fotos = succeedData;
      console.log(succeedData);
      this.email = localStorage.getItem("email");
      console.log("email", this.email);

      if(this.fotos != null && this.fotos != undefined){
        this.fotos.forEach(element => {
          if(element.votos != null){
            element.votos.forEach(email => {
              if(email == email){
                element.isLikedByThisUser = true;
              }
            });
          }
        });
      }

    });*/
    
  }


  votar(foto){
    var arr = new Array();
    arr.push(foto);
    this.fireauth.votar(arr[0], this.email[0]);
  }

	orderBy(field){
		switch (field) {
			case "Fecha":
				this.fotos.sort(this.compareFecha);
				break;
		}
  }
  
  compareFecha(a, b) {
    console.log("fecga A", a.fecha.seconds);
    console.log("fecga B", b.fecha.seconds);

    if (a.fecha.seconds < b.fecha.seconds) {
      return -1;
    }
    if (a.fecha.seconds > b.fecha.seconds) {
      return 1;
    }
    return 0;

  }
  
  transform(fecha) {
    //cosasLindas
    //cosasFeas
    //nanoseconds: 949000000

    var nowDate = new Date();
    var nowSeconds = nowDate.getTime()/1000; 
    var timePassed = nowSeconds - fecha.seconds;
    var dateFromSecons = new Date(nowDate.getTime()-(timePassed*1000))
    
    console.log(dateFromSecons.toLocaleDateString());

    return dateFromSecons;

  }
  doRefresh(){
    this.fireauth.getImages(this.fotos, this.email[0]);
  }

}
