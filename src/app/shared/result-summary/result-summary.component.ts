import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { AlgorithmResult, Point } from '@models';

@Component({
  selector: 'app-result-summary',
  templateUrl: './result-summary.component.html',
  styleUrls: ['./result-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultSummaryComponent implements OnInit {
  @Input() result: AlgorithmResult;
  @Input() displayPerfect: boolean;
  @Input() allPoints: Point[];
  @Input() convertPoints: boolean;

  readonly minProfit = 12500;
  readonly maxError = 0.1;
  readonly optimalDistance = 7000;

  get distancePercentError(): number {
    return (this.result.distance - this.optimalDistance) / this.optimalDistance;
  }

  get resultNodes(): string {
    const { nodes } = this.result;
    return this.convertPoints
      ? nodes.map((n) => this.getPointName(n)).join(', ')
      : nodes.join(', ');
  }

  constructor() {}

  ngOnInit(): void {}

  private getPointName(id: number): string {
    const point = this.allPoints.find((p) => +p.id === id);
    return point.name.replace(/_/g, ' ');
  }
}
