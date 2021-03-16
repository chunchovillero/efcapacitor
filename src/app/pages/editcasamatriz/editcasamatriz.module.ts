import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcasamatrizPageRoutingModule } from './editcasamatriz-routing.module';

import { EditcasamatrizPage } from './editcasamatriz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcasamatrizPageRoutingModule
  ],
  declarations: [EditcasamatrizPage]
})
export class EditcasamatrizPageModule {}
