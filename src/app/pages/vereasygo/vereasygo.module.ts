import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VereasygoPageRoutingModule } from './vereasygo-routing.module';

import { VereasygoPage } from './vereasygo.page';
import { SharableModule } from '../../components/sharable.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnaa365emUiwLwABQRqBkqxEkiweno-Gg',
      libraries: ['places']
    }),
    IonicModule,
    VereasygoPageRoutingModule
  ],
  declarations: [VereasygoPage]
})
export class VereasygoPageModule {}
