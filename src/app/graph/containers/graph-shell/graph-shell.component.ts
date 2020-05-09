import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as vis from 'vis';

@Component({
  selector: 'app-graph-shell',
  templateUrl: './graph-shell.component.html',
  styleUrls: ['./graph-shell.component.scss'],
})
export class GraphShellComponent implements OnInit, AfterViewInit {
  @ViewChild('graph', { static: false }) graphEl: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const nodes = new vis.DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' },
    ]);

    const edges = new vis.DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 },
    ]);
    const network = new vis.Network(
      this.graphEl.nativeElement,
      { nodes, edges },
      {}
    );
  }
}
