import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EasygoPageRoutingModule } from './easygo-routing.module';

import { EasygoPage } from './easygo.page';
import { SharableModule } from '../../components/sharable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharableModule,
    EasygoPageRoutingModule
  ],
  declarations: [EasygoPage]
})
export class EasygoPageModule {}
