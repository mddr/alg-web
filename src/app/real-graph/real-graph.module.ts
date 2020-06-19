import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { RealGraphRoutingModule } from './real-graph-routing.module';
import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [...CONTAINERS, ...COMPONENTS],
  imports: [CommonModule, RealGraphRoutingModule, LeafletModule, SharedModule],
})
export class RealGraphModule {}
