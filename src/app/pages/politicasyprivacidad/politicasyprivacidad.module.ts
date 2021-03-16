import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticasyprivacidadPageRoutingModule } from './politicasyprivacidad-routing.module';

import { PoliticasyprivacidadPage } from './politicasyprivacidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticasyprivacidadPageRoutingModule
  ],
  declarations: [PoliticasyprivacidadPage]
})
export class PoliticasyprivacidadPageModule {}
