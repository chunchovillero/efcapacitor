import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatestoriePage } from './createstorie.page';

const routes: Routes = [
  {
    path: '',
    component: CreatestoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatestoriePageRoutingModule {}
