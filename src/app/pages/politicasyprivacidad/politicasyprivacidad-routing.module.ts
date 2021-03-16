import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticasyprivacidadPage } from './politicasyprivacidad.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticasyprivacidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticasyprivacidadPageRoutingModule {}
