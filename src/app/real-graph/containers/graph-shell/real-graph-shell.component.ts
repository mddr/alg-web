import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GraphQuery, GraphService } from '../../state';

@Component({
  selector: 'app-real-graph-shell',
  templateUrl: './real-graph-shell.component.html',
  styleUrls: ['./real-graph-shell.component.scss'],
})
export class RealGraphShellComponent implements OnInit, OnDestroy {
  points$ = this.query.points$;
  loading$ = this.query.loading$;
  result$ = this.query.result$;

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
