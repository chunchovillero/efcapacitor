import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarautoPage } from './agregarauto.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarautoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarautoPageRoutingModule {}
