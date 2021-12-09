import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FirebaseAuth } from '../class/firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, asapScheduler, pipe, of, from,
	interval, merge, fromEvent } from 'rxjs';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})



export class Tab1Page {
	edificioFeo = "https://external-preview.redd.it/hwOmQthwVqspBxlewP9K2dJ0QBJLjjS3JzckGVTqbio.jpg?auto=webp&s=4cb098d861063b3480f79e2f8a40997216f2e382";
	edificioLindo = "https://thumbs.dreamstime.com/z/painted-building-berlin-germany-wohngenossenschaft-soldaritaet-coop-apartment-buildings-french-design-company-covers-square-50919100.jpg";
	constructor(private camera: Camera,
		public fireAuth: FirebaseAuth,
		private route: ActivatedRoute) { }

	options: CameraOptions = {
		quality: 100,
		sourceType : this.camera.PictureSourceType.CAMERA,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE
	};

	email = new Array();
	ngOnInit() {
		this.route.queryParams.
		  subscribe(params => {
			console.log(params); // { order: "popular" }
			this.email.length = 0;
			this.email.push(params);
		  }
		);
	  }

	error = "NoErrors";
	timestamp = 0;
	base64Img = "";
	success = "";


	cosasLindas() {
		console.log("cosasLindas");
		this.success = "cosasLindas";
		
		//this.fireAuth.addImage("base64Image", "cosasLindas", localStorage.getItem("email"), "path").then(response => { this.success += response }).catch(error => { this.error += error });

		let random = Math.random().toString(36).substr(2, 9) + '.jpg';
		let path = localStorage.getItem("email") + "_" + random;

		this.subirFoto("cosasLindas",path);

		this.success += "Chau";
	}

	async subirFoto(tipoDeFoto, path){
		await this.camera.getPicture(this.options).then((imageData) => {
			this.fireAuth.addImage(imageData, tipoDeFoto, localStorage.getItem("email"), path).then(response => { this.success += response }).catch(error => { this.error += error });
			this.cosasLindas();
		}, (err) => {
			this.error = err;
			// Handle error
		}).catch(err2 => {
			this.error = err2;
		});
	}

	

	cosasFeas() {
		console.log("cosasFeas");
		
		let random = Math.random().toString(36).substr(2, 9) + '.jpg';
		let path = localStorage.getItem("email") + "_" + random;
		this.subirFoto("cosasFeas", path);

		/*
		this.camera.getPicture(this.options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.base64Img = base64Image;
			//this.fireAuth.addImage(base64Image, "cosasFeas", localStorage.getItem("email"));

			var fileName = imageData[0].replace(/^.*[\\\/]/, '');
			var imgBlob = new Blob([base64Image], {type: 'image/jpeg'});
			this.success += fileName;
			this.success += "   imgBlob   " + imgBlob;
			console.log(fileName);
	
		}, (err) => {
			this.error = err;
			// Handle error
		});*/
	}
}
