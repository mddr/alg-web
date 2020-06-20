import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Point } from '@models';

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

  get startingPoint(): FormControl {
    return this.parentForm.get('startingPoint') as FormControl;
  }
  get minProfit(): FormControl {
    return this.parentForm.get('minProfit') as FormControl;
  }

  constructor() {}

  ngOnInit(): void {}
}
