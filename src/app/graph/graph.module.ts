import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { CONTAINERS } from './containers';

@NgModule({
  declarations: [...CONTAINERS],
  imports: [CommonModule, GraphRoutingModule],
})
export class GraphModule {}
