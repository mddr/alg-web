import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealGraphRoutingModule } from './real-graph-routing.module';
import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [...CONTAINERS, ...COMPONENTS],
  imports: [CommonModule, RealGraphRoutingModule, SharedModule],
})
export class RealGraphModule {}
