import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreareasygoPage } from './creareasygo.page';

const routes: Routes = [
  {
    path: '',
    component: CreareasygoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreareasygoPageRoutingModule {}
