import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';

@NgModule({
  declarations: [...CONTAINERS, ...COMPONENTS],
  imports: [CommonModule, GraphRoutingModule],
})
export class GraphModule {}
