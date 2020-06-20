import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Point } from '@models';

@Component({
  selector: 'app-flow-options',
  templateUrl: './flow-options.component.html',
  styleUrls: ['./flow-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowOptionsComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() points: Point[];
  @Input() displayWith: (p: Point) => string;
  @Input() filterBy: keyof Point;

  get start(): FormControl {
    return this.parent.get('start') as FormControl;
  }
  get end(): FormControl {
    return this.parent.get('end') as FormControl;
  }

  constructor() {}

  ngOnInit(): void {}
}
