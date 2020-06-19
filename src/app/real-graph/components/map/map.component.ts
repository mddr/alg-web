import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import * as L from 'leaflet';
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
export class MapComponent implements OnInit {
  @Input() set points(value: Point[]) {
    this.points$.next(value);
  }
  @Input() set pathIds(value: number[]) {
    this.pathIds$.next(value);
  }
  @Input() set highlightedPointId(value: number) {
    this.highlightedPointId$.next(value);
  }
  @Output() pointSelect = new EventEmitter<Point>();

  private pathIds$ = new BehaviorSubject<number[]>([]);
  private highlightedPointId$ = new BehaviorSubject<number>(null);

  private renderedMap: L.Map;
  private markersLayers: Layer[];
  private polyLinesLayer: Layer;
  private highlightedPointLayer: Layer;

  points$ = new BehaviorSubject<Point[]>([]);

  markers$: Observable<Layer[]> = this.points$.pipe(
    filter((p) => p && !!p.length),
    map((points) =>
      points.map((p) =>
        L.marker([p.latitude, p.longtitude], {
          title: p.name.replace('_', ' '),
          opacity: 0.5,
          interactive: true,
        }).on('click', () => {
          this.selectPoint(p);
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

  ngOnInit(): void {
    this.renderedMap = L.map('map').setView([52, 21.008333], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.renderedMap);

    this.markers$.subscribe((layers) => {
      if (this.markersLayers?.length) {
        this.markersLayers.forEach((l) => this.renderedMap.removeLayer(l));
      }
      this.markersLayers = layers;
      layers.forEach((l) => l.addTo(this.renderedMap));
    });
    this.polyLine$.subscribe((l) => {
      if (this.polyLinesLayer) {
        this.renderedMap.removeLayer(this.polyLinesLayer);
      }
      l.addTo(this.renderedMap);
      this.polyLinesLayer = l;
    });
    this.highlightedPoint$.subscribe((l) => {
      if (this.highlightedPointLayer) {
        this.renderedMap.removeLayer(this.highlightedPointLayer);
      }
      l.addTo(this.renderedMap);
      this.highlightedPointLayer = l;
    });
  }

  selectPoint(point: Point) {
    this.pointSelect.emit(point);
  }
}
