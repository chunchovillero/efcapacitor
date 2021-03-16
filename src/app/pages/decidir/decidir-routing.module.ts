import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecidirPage } from './decidir.page';

const routes: Routes = [
  {
    path: '',
    component: DecidirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecidirPageRoutingModule {}
