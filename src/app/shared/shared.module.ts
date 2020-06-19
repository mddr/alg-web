import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultSummaryComponent } from './result-summary/result-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PathOptionsComponent } from './path-options/path-options.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NamePipe } from './name.pipe';

const MODULES = [FormsModule, ReactiveFormsModule];

const MATERIAL = [MatAutocompleteModule, MatFormFieldModule, MatInputModule];

@NgModule({
  declarations: [ResultSummaryComponent, PathOptionsComponent, NamePipe],
  imports: [CommonModule, ...MODULES, ...MATERIAL],
  exports: [
    ResultSummaryComponent,
    PathOptionsComponent,
    NamePipe,
    ...MODULES,
    ...MATERIAL,
  ],
})
export class SharedModule {}
