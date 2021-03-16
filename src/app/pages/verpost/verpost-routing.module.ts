import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerpostPage } from './verpost.page';

const routes: Routes = [
  {
    path: '',
    component: VerpostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerpostPageRoutingModule {}
