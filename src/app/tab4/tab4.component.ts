import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '../class/firebase-auth';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component implements OnInit {

  constructor(public fireauth : FirebaseAuth) {}

  fotos = new Array();
  email = AuthServiceService.usuario;

  ngOnInit() {
    console.log("to get fotos filtered");
    this.fireauth.bringEntityFilteredByDateAndOwner("/image", this.fotos, this.email);
  }

}
