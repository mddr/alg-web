import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultSummaryComponent } from './result-summary/result-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PathOptionsComponent } from './path-options/path-options.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NamePipe } from './name.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressComponent } from './progress/progress.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

const MODULES = [FormsModule, ReactiveFormsModule];

const MATERIAL = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    ResultSummaryComponent,
    PathOptionsComponent,
    NamePipe,
    ProgressComponent,
  ],
  imports: [CommonModule, ...MODULES, ...MATERIAL],
  exports: [
    ResultSummaryComponent,
    PathOptionsComponent,
    NamePipe,
    ProgressComponent,
    ...MODULES,
    ...MATERIAL,
  ],
})
export class SharedModule {}
