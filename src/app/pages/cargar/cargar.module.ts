import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargarPageRoutingModule } from './cargar-routing.module';

import { CargarPage } from './cargar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargarPageRoutingModule
  ],
  declarations: [CargarPage]
})
export class CargarPageModule {}
