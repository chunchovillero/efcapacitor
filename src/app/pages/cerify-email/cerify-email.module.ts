import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CerifyEmailPageRoutingModule } from './cerify-email-routing.module';

import { CerifyEmailPage } from './cerify-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CerifyEmailPageRoutingModule
  ],
  declarations: [CerifyEmailPage]
})
export class CerifyEmailPageModule {}
