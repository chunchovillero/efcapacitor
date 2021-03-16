import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CerifyEmailPage } from './cerify-email.page';

const routes: Routes = [
  {
    path: '',
    component: CerifyEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CerifyEmailPageRoutingModule {}
