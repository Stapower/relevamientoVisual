import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Component } from './tab4.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MatProgressSpinnerModule } from '@angular/material';
import { TipoFoto2Pipe } from '../pipes/tipo-foto2.pipe';
import { Fecha2Pipe } from '../pipes/fecha2.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([{ path: '', component: Tab4Component }])
  ],
  declarations: [Tab4Component, TipoFoto2Pipe, Fecha2Pipe]
})
export class Tab4PageModule {}
