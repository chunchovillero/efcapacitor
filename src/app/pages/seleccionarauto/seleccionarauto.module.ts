import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarautoPageRoutingModule } from './seleccionarauto-routing.module';

import { SeleccionarautoPage } from './seleccionarauto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarautoPageRoutingModule
  ],
  declarations: [SeleccionarautoPage]
})
export class SeleccionarautoPageModule {}
