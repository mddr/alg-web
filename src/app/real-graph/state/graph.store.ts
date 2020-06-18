import { Injectable } from '@angular/core';
import { Graph } from './graph.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface GraphState extends EntityState<Graph> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'graph' })
export class GraphStore extends EntityStore<GraphState> {

  constructor() {
    super();
  }

}

