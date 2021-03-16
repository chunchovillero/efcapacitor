import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcasamatrizPage } from './editcasamatriz.page';

const routes: Routes = [
  {
    path: '',
    component: EditcasamatrizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcasamatrizPageRoutingModule {}
