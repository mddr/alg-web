import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultSummaryComponent } from './result-summary/result-summary.component';

@NgModule({
  declarations: [ResultSummaryComponent],
  imports: [CommonModule],
  exports: [ResultSummaryComponent],
})
export class SharedModule {}
