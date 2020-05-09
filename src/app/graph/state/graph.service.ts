import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { GraphStore } from './graph.store';
import { Graph } from './graph.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GraphService {

  constructor(private graphStore: GraphStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get<Graph[]>('https://api.com').pipe(tap(entities => {
      this.graphStore.set(entities);
    }));
  }

  add(graph: Graph) {
    this.graphStore.add(graph);
  }

  update(id, graph: Partial<Graph>) {
    this.graphStore.update(id, graph);
  }

  remove(id: ID) {
    this.graphStore.remove(id);
  }
}
