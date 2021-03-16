import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecidirPageRoutingModule } from './decidir-routing.module';

import { DecidirPage } from './decidir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecidirPageRoutingModule
  ],
  declarations: [DecidirPage]
})
export class DecidirPageModule {}
