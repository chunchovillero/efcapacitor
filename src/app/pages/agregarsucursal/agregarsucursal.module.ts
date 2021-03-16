import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarsucursalPageRoutingModule } from './agregarsucursal-routing.module';

import { AgregarsucursalPage } from './agregarsucursal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarsucursalPageRoutingModule
  ],
  declarations: [AgregarsucursalPage]
})
export class AgregarsucursalPageModule {}
