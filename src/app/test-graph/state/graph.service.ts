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
    return this.http.get<Graph>(`${environment.apiUrl}/path/getPoints`).pipe(
      tap((graph) => {
        this.graphStore.set(graph.points);
        this.graphStore.setLoading(false);
      })
    );
  }

  ils(startingPoint: number, minProfit: number): Observable<AlgorithmResult> {
    const params = new HttpParams()
      .set('start', startingPoint.toString())
      .set('min', minProfit.toString());

    this.graphStore.setLoading(true);

    const startTime = performance.now();
    return this.http
      .get<AlgorithmResult>(`${environment.apiUrl}/path/ils`, { params })
      .pipe(
        map((result) => ({
          ...result,
          algorithm: AlgorithmType.ILS,
          timeMs: performance.now() - startTime,
        })),
        tap((result) => {
          this.graphStore.saveResult(result);
          this.graphStore.setLoading(false);
        })
      );
  }

  vns(startingPoint: number, minProfit: number): Observable<AlgorithmResult> {
    const params = new HttpParams()
      .set('start', startingPoint.toString())
      .set('min', minProfit.toString());

    this.graphStore.setLoading(true);

    const startTime = performance.now();
    return this.http
      .get<AlgorithmResult>(`${environment.apiUrl}/path/vns`, { params })
      .pipe(
        map((result) => ({
          ...result,
          algorithm: AlgorithmType.VNS,
          timeMs: performance.now() - startTime,
        })),
        tap((result) => {
          this.graphStore.saveResult(result);
          this.graphStore.setLoading(false);
        })
      );
  }
}
