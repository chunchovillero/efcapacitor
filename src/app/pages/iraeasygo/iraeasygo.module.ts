import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IraeasygoPageRoutingModule } from './iraeasygo-routing.module';

import { IraeasygoPage } from './iraeasygo.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnaa365emUiwLwABQRqBkqxEkiweno-Gg',
      libraries: ['places']
    }),
    AgmDirectionModule,
    IraeasygoPageRoutingModule
  ],
  declarations: [IraeasygoPage]
})
export class IraeasygoPageModule {}
