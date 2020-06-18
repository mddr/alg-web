import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GraphStore, GraphState } from './graph.store';

@Injectable({ providedIn: 'root' })
export class GraphQuery extends QueryEntity<GraphState> {

  constructor(protected store: GraphStore) {
    super(store);
  }

}
