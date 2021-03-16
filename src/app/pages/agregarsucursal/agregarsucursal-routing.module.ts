import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarsucursalPage } from './agregarsucursal.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarsucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarsucursalPageRoutingModule {}
