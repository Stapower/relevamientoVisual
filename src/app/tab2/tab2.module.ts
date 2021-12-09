import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MatProgressSpinnerModule } from '@angular/material';
import { TipoFotoPipe } from '../pipes/tipo-foto.pipe';
import { FechaPipe } from '../pipes/fecha.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page, TipoFotoPipe, FechaPipe]
})
export class Tab2PageModule {}
