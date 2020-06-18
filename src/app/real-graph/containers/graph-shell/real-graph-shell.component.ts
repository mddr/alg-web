import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-real-graph-shell',
  templateUrl: './real-graph-shell.component.html',
  styleUrls: ['./real-graph-shell.component.scss'],
})
export class RealGraphShellComponent implements OnInit, AfterViewInit {
  readonly options = {
    layers: [
      tileLayer(
        'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 20,
          attribution:
            '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        }
      ),
    ],
    zoom: 7,
    center: latLng(52, 21.008333),
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
