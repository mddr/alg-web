import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'upload',
        loadChildren: () =>
          import('./upload/upload.module').then((m) => m.UploadModule),
      },
      {
        path: 'graph',
        loadChildren: () =>
          import('./graph/graph.module').then((m) => m.GraphModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
