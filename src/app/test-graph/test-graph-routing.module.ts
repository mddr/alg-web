import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestGraphShellComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: TestGraphShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestGraphRoutingModule {}
