import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizarDescripcionPage } from './cotizar-descripcion.page';

const routes: Routes = [
  {
    path: '',
    component: CotizarDescripcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotizarDescripcionPageRoutingModule {}
