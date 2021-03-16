import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorietopPageRoutingModule } from './storietop-routing.module';

import { StorietopPage } from './storietop.page';
import { SharableModule } from '../../components/sharable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharableModule,
    IonicModule,
    StorietopPageRoutingModule
  ],
  declarations: [StorietopPage]
})
export class StorietopPageModule {}
