import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphRoute, UploadRoute } from '@consts';

const routes: Routes = [
  {
    path: UploadRoute,
    loadChildren: () =>
      import('./upload/upload.module').then((m) => m.UploadModule),
  },
  {
    path: GraphRoute,
    loadChildren: () =>
      import('./graph/graph.module').then((m) => m.GraphModule),
  },

  {
    path: '**',
    redirectTo: GraphRoute,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
