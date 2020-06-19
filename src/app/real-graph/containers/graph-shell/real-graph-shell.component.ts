import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { GraphQuery, GraphService } from '../../state';
import { map, tap } from 'rxjs/operators';
import { Point } from '@models';

@Component({
  selector: 'app-real-graph-shell',
  templateUrl: './real-graph-shell.component.html',
  styleUrls: ['./real-graph-shell.component.scss'],
})
export class RealGraphShellComponent implements OnInit, OnDestroy {
  points$ = this.query.points$;
  loading$ = this.query.loading$;
  result$ = this.query.result$;

  pathForm: FormGroup;
  highlightedPointId$: Observable<number>;

  private subs = new Subscription();

  constructor(
    private service: GraphService,
    private query: GraphQuery,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subs.add(this.service.fetchPoints().subscribe());

    this.pathForm = this.fb.group({
      startingPoint: [null, Validators.required],
      minProfit: [125000, [Validators.required, Validators.min(1000)]],
    });
    this.highlightedPointId$ = this.pathForm
      .get('startingPoint')
      .valueChanges.pipe(
        map((h) => (typeof h === 'string' ? +h : +h.id)),
        tap((h) => console.log({ h }))
      );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  displayWith(p: Point): string {
    return p ? p.name : '';
  }

  runIls() {
    this.pathForm.markAllAsTouched();
    this.pathForm.get('startingPoint').updateValueAndValidity();
    if (!this.pathForm.valid) {
      return;
    }
    const {
      startingPoint: { id },
      minProfit,
    } = this.pathForm.value;
    this.subs.add(this.service.ils(id, minProfit).subscribe());
  }

  runVns() {
    this.pathForm.markAllAsTouched();
    this.pathForm.get('startingPoint').updateValueAndValidity();
    if (!this.pathForm.valid) {
      return;
    }
    const {
      startingPoint: { id },
      minProfit,
    } = this.pathForm.value;
    this.subs.add(this.service.vns(id, minProfit).subscribe());
  }
}
