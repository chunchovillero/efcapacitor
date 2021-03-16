import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditareasygoPageRoutingModule } from './editareasygo-routing.module';

import { EditareasygoPage } from './editareasygo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditareasygoPageRoutingModule
  ],
  declarations: [EditareasygoPage]
})
export class EditareasygoPageModule {}
