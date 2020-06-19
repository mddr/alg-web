import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestGraphRoutingModule } from './test-graph-routing.module';
import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';
import { PIPES } from './pipes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [...CONTAINERS, ...COMPONENTS, ...PIPES],
  imports: [CommonModule, TestGraphRoutingModule, SharedModule],
})
export class TestGraphModule {}
