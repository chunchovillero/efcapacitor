import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorieviewerPageRoutingModule } from './storieviewer-routing.module';

import { StorieviewerPage } from './storieviewer.page';
import { SharableModule } from '../../components/sharable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharableModule,
    IonicModule,
    StorieviewerPageRoutingModule
  ],
  declarations: [StorieviewerPage]
})
export class StorieviewerPageModule {}
