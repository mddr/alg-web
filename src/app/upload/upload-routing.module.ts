import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadShellComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: UploadShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadRoutingModule {}
