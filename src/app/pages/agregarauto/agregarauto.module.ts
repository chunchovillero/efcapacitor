import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarautoPageRoutingModule } from './agregarauto-routing.module';

import { AgregarautoPage } from './agregarauto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarautoPageRoutingModule
  ],
  declarations: [AgregarautoPage]
})
export class AgregarautoPageModule {}
