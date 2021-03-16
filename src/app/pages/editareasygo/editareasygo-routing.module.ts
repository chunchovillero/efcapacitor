import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditareasygoPage } from './editareasygo.page';

const routes: Routes = [
  {
    path: '',
    component: EditareasygoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditareasygoPageRoutingModule {}
