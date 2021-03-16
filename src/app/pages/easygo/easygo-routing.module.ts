import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EasygoPage } from './easygo.page';

const routes: Routes = [
  {
    path: '',
    component: EasygoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EasygoPageRoutingModule {}
