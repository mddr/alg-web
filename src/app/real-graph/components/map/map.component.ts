import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { latLng, Layer, marker, polyline, tileLayer } from 'leaflet';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { Point } from '@models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() set points(value: Point[]) {
    this.points$.next(value);
  }
  @Input() set pathIds(value: number[]) {
    this.pathIds$.next(value);
  }
  @Input() set highlightedPointId(value: number) {
    this.highlightedPointId$.next(value);
  }

  private pathIds$ = new BehaviorSubject<number[]>([]);
  private highlightedPointId$ = new BehaviorSubject<number>(null);

  points$ = new BehaviorSubject<Point[]>([]);

  markers$: Observable<Layer[]> = this.points$.pipe(
    filter((p) => p && !!p.length),
    map((points) =>
      points.map((p) =>
        marker([p.latitude, p.longtitude], {
          title: p.name.replace('_', ' '),
          opacity: 0.5,
        })
      )
    )
  );
  polyLine$: Observable<Layer> = this.pathIds$.asObservable().pipe(
    filter((p) => p && !!p.length),
    withLatestFrom(this.points$),
    map(([pathIds, points]) => {
      const coords = pathIds.map((id) => {
        const point = points.find((p) => +p.id === id);
        return latLng(point.latitude, point.longtitude);
      });

      const first = points.find((p) => +p.id === pathIds[0]);
      const coordsWithFirst = [
        ...coords,
        latLng(first.latitude, first.longtitude),
      ];
      return polyline(coordsWithFirst, { color: 'red' });
    })
  );
  highlightedPoint$: Observable<Layer> = this.highlightedPointId$.pipe(
    filter((p) => !!p),
    withLatestFrom(this.points$),
    map(([id, points]) => {
      const point = points.find((p) => +p.id === id);
      return marker([point.latitude, point.longtitude], {
        title: point.name.replace('_', ' '),
      });
    })
  );

  readonly options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 7,
    center: latLng(52, 21.008333),
  };

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {}
}
