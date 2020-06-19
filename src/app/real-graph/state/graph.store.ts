import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { AlgorithmResult, Point } from '@models';

export interface GraphState extends EntityState<Point> {
  result: AlgorithmResult;
}

const initialState: GraphState = {
  loading: true,
  result: null,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'real-graph' })
export class GraphStore extends EntityStore<GraphState> {
  constructor() {
    super(initialState);
  }

  saveResult(result: AlgorithmResult) {
    this.update({ result });
  }
}
