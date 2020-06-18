import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealGraphRoute, TestGraphRoute } from '@consts';

const routes: Routes = [
  {
    path: RealGraphRoute,
    loadChildren: () =>
      import('./real-graph/real-graph.module').then((m) => m.RealGraphModule),
  },
  {
    path: TestGraphRoute,
    loadChildren: () =>
      import('./test-graph/test-graph.module').then((m) => m.TestGraphModule),
  },
  {
    path: '**',
    redirectTo: TestGraphRoute,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
