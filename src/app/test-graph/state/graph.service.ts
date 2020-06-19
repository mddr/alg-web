import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AlgorithmType, AlgorithmResult, Graph } from '@models';

import { GraphStore } from './graph.store';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GraphService {
  constructor(private graphStore: GraphStore, private http: HttpClient) {}

  fetchPoints(): Observable<Graph> {
    return this.http.get<Graph>(`${environment.apiUrl}/path/getPoints`).pipe(
      tap((graph) => {
        this.graphStore.set(graph.points);
        this.graphStore.setLoading(false);
      })
    );
  }

  ils(): Observable<AlgorithmResult> {
    this.graphStore.setLoading(true);
    return this.http
      .get<AlgorithmResult>(`${environment.apiUrl}/path/ils`)
      .pipe(
        map((result) => ({ ...result, algorithm: AlgorithmType.ILS })),
        tap((result) => {
          this.graphStore.saveResult(result);
          this.graphStore.setLoading(false);
        })
      );
  }

  vns(): Observable<AlgorithmResult> {
    this.graphStore.setLoading(true);
    return this.http
      .get<AlgorithmResult>(`${environment.apiUrl}/path/vns`)
      .pipe(
        map((result) => ({ ...result, algorithm: AlgorithmType.VNS })),
        tap((result) => {
          this.graphStore.saveResult(result);
          this.graphStore.setLoading(false);
        })
      );
  }
}
