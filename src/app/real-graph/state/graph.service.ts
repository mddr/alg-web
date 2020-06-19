import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AlgorithmType, AlgorithmResult, Graph } from '@models';

import { GraphStore } from './graph.store';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GraphService {
  constructor(private graphStore: GraphStore, private http: HttpClient) {}

  fetchPoints(): Observable<Graph> {
    return this.http
      .get<Graph>(`${environment.apiUrl}/path/realGetPoints`)
      .pipe(
        tap((graph) => {
          this.graphStore.set(graph.points);
          this.graphStore.setLoading(false);
        })
      );
  }

  ils(start: number, min: number): Observable<AlgorithmResult> {
    const params = new HttpParams()
      .set('start', start.toString())
      .set('min', min.toString());

    this.graphStore.clearResult();
    this.graphStore.setLoading(true);
    return this.http
      .get<AlgorithmResult>(`${environment.apiUrl}/path/realIls`, { params })
      .pipe(
        map((result) => ({ ...result, algorithm: AlgorithmType.ILS })),
        tap((result) => {
          this.graphStore.saveResult(result);
          this.graphStore.setLoading(false);
        })
      );
  }

  vns(start: number, min: number): Observable<AlgorithmResult> {
    const params = new HttpParams()
      .set('start', start.toString())
      .set('min', min.toString());

    this.graphStore.clearResult();
    this.graphStore.setLoading(true);
    return this.http
      .get<AlgorithmResult>(`${environment.apiUrl}/path/realVns`, { params })
      .pipe(
        map((result) => ({ ...result, algorithm: AlgorithmType.VNS })),
        tap((result) => {
          this.graphStore.saveResult(result);
          this.graphStore.setLoading(false);
        })
      );
  }
}
