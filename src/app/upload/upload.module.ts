import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { CONTAINERS } from './containers';

@NgModule({
  declarations: [...CONTAINERS],
  imports: [CommonModule, UploadRoutingModule],
})
export class UploadModule {}
