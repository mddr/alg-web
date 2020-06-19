import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {  latLng, Layer, marker, polyline, tileLayer } from 'leaflet';
import { BehaviorSubject, Observable } from 'rxjs';
import {  filter, map, withLatestFrom } from 'rxjs/operators';

import { Point } from '@models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  @Input() set points(value: Point[]) {
    this.points$.next(value);
  }
  @Input() set pathIds(value: number[]) {
    this.pathIds$.next(value);
  }

  private pathIds$ = new BehaviorSubject<number[]>([]);

  points$ = new BehaviorSubject<Point[]>([]);

  markers$: Observable<Layer[]> = this.points$.pipe(
    filter((p) => p && !!p.length),
    map((points) =>
      points.map((p) =>
        marker([p.latitude, p.longtitude], {
          title: p.name.replace('_', ' '),
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
      return polyline(coords, { color: 'red' });
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
}
