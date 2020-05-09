import { Component } from '@angular/core';

import { GraphRoute, UploadRoute } from '@consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly routes = [UploadRoute, GraphRoute];
}
