import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IraeasygoPage } from './iraeasygo.page';

const routes: Routes = [
  {
    path: '',
    component: IraeasygoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IraeasygoPageRoutingModule {}
