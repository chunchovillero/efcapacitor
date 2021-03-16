import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DragPage } from './drag.page';

const routes: Routes = [
  {
    path: '',
    component: DragPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DragPageRoutingModule {}
