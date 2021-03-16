import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EasygobyuserPage } from './easygobyuser.page';

const routes: Routes = [
  {
    path: '',
    component: EasygobyuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EasygobyuserPageRoutingModule {}
