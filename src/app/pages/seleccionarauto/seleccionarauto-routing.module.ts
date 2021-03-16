import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionarautoPage } from './seleccionarauto.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionarautoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionarautoPageRoutingModule {}
