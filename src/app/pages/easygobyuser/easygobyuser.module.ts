import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EasygobyuserPageRoutingModule } from './easygobyuser-routing.module';

import { EasygobyuserPage } from './easygobyuser.page';
import { SharableModule } from '../../components/sharable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharableModule,
    EasygobyuserPageRoutingModule
  ],
  declarations: [EasygobyuserPage]
})
export class EasygobyuserPageModule {}
