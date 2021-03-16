import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorieviewerPage } from './storieviewer.page';

const routes: Routes = [
  {
    path: '',
    component: StorieviewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorieviewerPageRoutingModule {}
