import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatestoriePageRoutingModule } from './createstorie-routing.module';

import { CreatestoriePage } from './createstorie.page';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragDropModule,
    CreatestoriePageRoutingModule
  ],
  declarations: [CreatestoriePage]
})
export class CreatestoriePageModule {}
