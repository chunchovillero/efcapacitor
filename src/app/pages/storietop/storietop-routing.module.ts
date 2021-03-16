import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorietopPage } from './storietop.page';

const routes: Routes = [
  {
    path: '',
    component: StorietopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorietopPageRoutingModule {}
