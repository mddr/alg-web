import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { AlgorithmResult } from '@models';

@Component({
  selector: 'app-result-summary',
  templateUrl: './result-summary.component.html',
  styleUrls: ['./result-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultSummaryComponent implements OnInit {
  @Input() result: AlgorithmResult;

  readonly minProfit = 12500;
  readonly maxError = 0.07;
  readonly optimalDistance = 7000;

  get distancePercentError(): number {
    return (this.result.distance - this.optimalDistance) / this.optimalDistance;
  }

  constructor() {}

  ngOnInit(): void {}
}
