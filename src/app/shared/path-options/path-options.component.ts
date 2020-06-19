import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Point } from '@models';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-path-options',
  templateUrl: './path-options.component.html',
  styleUrls: ['./path-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathOptionsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() points: Point[];
  @Input() filterBy: keyof Point;
  @Input() displayWith: (p: Point) => string;

  filteredPoints$: Observable<Point[]>;

  get startingPoint(): FormControl {
    return this.parentForm.get('startingPoint') as FormControl;
  }
  get minProfit(): FormControl {
    return this.parentForm.get('minProfit') as FormControl;
  }

  constructor() {}

  ngOnInit(): void {
    this.filteredPoints$ = this.startingPoint.valueChanges.pipe(
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
