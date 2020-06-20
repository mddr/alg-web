import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Point } from '@models';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() control: FormControl;
  @Input() points: Point[];
  @Input() displayWith: (p: Point) => string;
  @Input() filterBy: keyof Point;

  filteredPoints$: Observable<Point[]>;

  constructor() {}

  ngOnInit(): void {
    this.filteredPoints$ = this.control.valueChanges.pipe(
      startWith(''),
      map((v) => this.getFiltered(v))
    );
  }

  private getFiltered(inputValue: string | Point): Point[] {
    if (!inputValue) {
      return this.points;
    }
    const filter =
      typeof inputValue === 'string'
        ? inputValue
        : inputValue[this.filterBy].toString();
    const filterValue = filter.toLowerCase();

    return this.points.filter((p) => {
      const value = p[this.filterBy];
      return typeof value === 'string'
        ? value.toLowerCase().includes(filterValue)
        : +value === +filterValue;
    });
  }
}
