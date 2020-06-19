import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { AlgorithmResult, Point } from '@models';

export interface GraphState extends EntityState<Point> {
  result: AlgorithmResult;
  loadingAlgorithm: boolean;
}

const initialState: GraphState = {
  loading: true,
  result: null,
  loadingAlgorithm: false,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'test-graph' })
export class GraphStore extends EntityStore<GraphState> {
  constructor() {
    super(initialState);
  }

  saveResult(result: AlgorithmResult) {
    this.update({ result });
  }

  clearResult() {
    this.update({ result: null });
  }

  setLoadingAlgorithm(value: boolean) {
    this.update({ loadingAlgorithm: value });
  }
}
