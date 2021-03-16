import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MegustaPage } from './megusta.page';

const routes: Routes = [
  {
    path: '',
    component: MegustaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MegustaPageRoutingModule {}
