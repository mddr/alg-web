import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GraphStore, GraphState } from './graph.store';

@Injectable({ providedIn: 'root' })
export class GraphQuery extends QueryEntity<GraphState> {
  points$ = this.selectAll();
  loading$ = this.selectLoading();
  loadingAlgorithm$ = this.select((state) => state.loadingAlgorithm);

  result$ = this.select((state) => state.result);

  constructor(protected store: GraphStore) {
    super(store);
  }
}
