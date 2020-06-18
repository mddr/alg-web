import { Component } from '@angular/core';

import { RealGraphRoute, TestGraphRoute } from '@consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly routes = [
    { route: TestGraphRoute, name: 'Test data' },
    { route: RealGraphRoute, name: 'Real data' },
  ];
}
