import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CotizacionPageRoutingModule } from './cotizacion-routing.module';

import { CotizacionPage } from './cotizacion.page';
import { SharableModule } from '../../components/sharable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharableModule,
    CotizacionPageRoutingModule
  ],
  declarations: [CotizacionPage]
})
export class CotizacionPageModule {}
