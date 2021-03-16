import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreareasygoPageRoutingModule } from './creareasygo-routing.module';

import { CreareasygoPage } from './creareasygo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreareasygoPageRoutingModule
  ],
  declarations: [CreareasygoPage]
})
export class CreareasygoPageModule {}
