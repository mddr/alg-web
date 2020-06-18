import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { RealGraphRoutingModule } from './real-graph-routing.module';
import { CONTAINERS } from './containers';

@NgModule({
  declarations: [...CONTAINERS],
  imports: [CommonModule, RealGraphRoutingModule, LeafletModule],
})
export class RealGraphModule {}
