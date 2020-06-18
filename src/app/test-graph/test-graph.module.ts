import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestGraphRoutingModule } from './test-graph-routing.module';
import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';

@NgModule({
  declarations: [...CONTAINERS, ...COMPONENTS],
  imports: [CommonModule, TestGraphRoutingModule],
})
export class TestGraphModule {}
