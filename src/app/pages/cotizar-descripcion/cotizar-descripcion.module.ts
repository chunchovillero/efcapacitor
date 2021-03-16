import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CotizarDescripcionPageRoutingModule } from './cotizar-descripcion-routing.module';
import { CotizarDescripcionPage } from './cotizar-descripcion.page';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnaa365emUiwLwABQRqBkqxEkiweno-Gg',
      libraries: ['places']
    }),
    CotizarDescripcionPageRoutingModule
  ],
  declarations: [CotizarDescripcionPage]
})
export class CotizarDescripcionPageModule {}
