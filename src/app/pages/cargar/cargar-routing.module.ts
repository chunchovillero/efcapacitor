import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargarPage } from './cargar.page';

const routes: Routes = [
  {
    path: '',
    component: CargarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargarPageRoutingModule {}
