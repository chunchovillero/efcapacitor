import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DragPageRoutingModule } from './drag-routing.module';

import { DragPage } from './drag.page';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragDropModule,
    DragPageRoutingModule
  ],
  declarations: [DragPage]
})
export class DragPageModule {}
