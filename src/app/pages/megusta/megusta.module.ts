import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MegustaPageRoutingModule } from './megusta-routing.module';

import { MegustaPage } from './megusta.page';
import { SharableModule } from '../../components/sharable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharableModule,
    IonicModule,
    MegustaPageRoutingModule
  ],
  declarations: [MegustaPage]
})
export class MegustaPageModule {}
