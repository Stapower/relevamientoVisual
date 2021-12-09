import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import firebaseConfig from '../environments/environment';
import { Camera } from '@ionic-native/camera/ngx';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import {MyServiceService} from './services/my-service.service';
import {LogOutComponent} from './auth/log-out/log-out.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';


@NgModule({
	declarations: [AppComponent, HeaderMenuComponent,LogOutComponent],
	entryComponents: [],
	imports: [BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(firebaseConfig.firebase),
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		MatProgressSpinnerModule,
		BrowserAnimationsModule],
		
	providers: [
		StatusBar,
		SplashScreen,
		Camera,
		AngularFirestore,
		MyServiceService,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
