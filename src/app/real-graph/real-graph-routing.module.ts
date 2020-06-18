import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealGraphShellComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: RealGraphShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealGraphRoutingModule {}
