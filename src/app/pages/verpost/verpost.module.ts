import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerpostPageRoutingModule } from './verpost-routing.module';

import { VerpostPage } from './verpost.page';
import { SharableModule } from '../../components/sharable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharableModule,
    IonicModule,
    VerpostPageRoutingModule
  ],
  declarations: [VerpostPage]
})
export class VerpostPageModule {}
