import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-flow-result',
  templateUrl: './flow-result.component.html',
  styleUrls: ['./flow-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowResultComponent implements OnInit {
  @Input() result: number;

  constructor() {}

  ngOnInit(): void {}
}
