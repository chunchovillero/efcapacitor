import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VereasygoPage } from './vereasygo.page';

const routes: Routes = [
  {
    path: '',
    component: VereasygoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VereasygoPageRoutingModule {}
