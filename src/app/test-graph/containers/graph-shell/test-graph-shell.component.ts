import { Component, OnDestroy, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { GraphQuery, GraphService } from '../../state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-graph-shell',
  templateUrl: './test-graph-shell.component.html',
  styleUrls: ['./test-graph-shell.component.scss'],
})
export class TestGraphShellComponent implements OnInit, OnDestroy {
  points$ = this.query.points$.pipe(shareReplay());
  loading$ = this.query.loading$.pipe(shareReplay());
  result$ = this.query.result$.pipe(shareReplay());

  private subs = new Subscription();

  constructor(private service: GraphService, private query: GraphQuery) {}

  ngOnInit(): void {
    this.subs.add(this.service.fetchPoints().subscribe());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  runIls() {
    this.subs.add(this.service.ils().subscribe());
  }

  runVns() {
    this.subs.add(this.service.vns().subscribe());
  }
}
