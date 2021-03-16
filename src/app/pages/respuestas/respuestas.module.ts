import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespuestasPageRoutingModule } from './respuestas-routing.module';

import { RespuestasPage } from './respuestas.page';
import { SharableModule } from '../../components/sharable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharableModule,
    RespuestasPageRoutingModule
  ],
  declarations: [RespuestasPage]
})
export class RespuestasPageModule {}
