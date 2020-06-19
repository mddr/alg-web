import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  Observable,
  Subject,
} from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  shareReplay,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { Point } from '@models';
import * as d3 from 'd3';

interface Size {
  height: number;
  width: number;
}

interface Margins {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const DOMAIN_MULTIPLIER = 1.1;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GraphComponent implements OnInit, AfterViewInit, OnDestroy {
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

  @ViewChild('wrapper') private wrapperEl: ElementRef<HTMLDivElement>;
  @ViewChild('chart') private svgEl: ElementRef<SVGGElement>;

  private pathIds$ = new BehaviorSubject<number[]>([]);
  private highlightedPointId$ = new BehaviorSubject<number>(null);
  private wrapper$ = new BehaviorSubject<HTMLDivElement>(null);
  private onDestroy$ = new Subject<void>();

  points$ = new BehaviorSubject<Point[]>([]);
  svgSize$: Observable<Size>;
  chartSize$: Observable<Size>;
  margins$: Observable<Margins> = new BehaviorSubject<Margins>({
    left: 60,
    top: 30,
    right: 30,
    bottom: 30,
  }).pipe(shareReplay());

  path$: Observable<string> = this.pathIds$.asObservable().pipe(
    filter((p) => p && !!p.length),
    withLatestFrom(this.points$),
    map(([pathIds, points]) => {
      const path = d3.path();

      const point0 = points.find((p) => +p.id === pathIds[0]);
      const { x: x0, y: y0 } = this.chartPoint(point0);
      path.moveTo(x0, y0);

      pathIds.forEach((id) => {
        const point = points.find((p) => +p.id === id);
        const { x, y } = this.chartPoint(point);
        path.lineTo(x, y);
      });
      path.closePath();

      return path.toString();
    })
  );

  highlightedPoint$: Observable<Point> = this.highlightedPointId$.pipe(
    filter((p) => !!p),
    withLatestFrom(this.points$),
    map(([id, points]) => points.find((p) => +p.id === id))
  );

  xAxis: d3.ScaleLinear<number, number>;
  yAxis: d3.ScaleLinear<number, number>;

  constructor() {}

  ngOnInit(): void {
    this.initSvgSize();
    this.initChart();
    this.initAxes();
    this.initResizeHandler();
  }

  ngAfterViewInit(): void {
    this.updateChartDimensions();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  selectPoint(point: Point) {
    this.pointSelect.emit(point);
  }

  private initSvgSize() {
    this.svgSize$ = this.wrapper$.pipe(
      takeUntil(this.onDestroy$),
      filter((x) => !!x),
      map((el) => ({
        height: el.offsetHeight,
        width: el.offsetWidth,
      })),
      shareReplay()
    );
  }

  private initChart() {
    this.chartSize$ = this.svgSize$.pipe(
      withLatestFrom(this.margins$),
      map(([size, margins]) => ({
        height: size.height - margins.top - margins.bottom,
        width: size.width - margins.left - margins.right,
      })),
      shareReplay()
    );
    this.chartSize$.subscribe();
  }

  private initAxes() {
    combineLatest([this.chartSize$, this.points$])
      .pipe(
        tap(([size, points]) => this.drawXAxis(points, size)),
        tap(([size, points]) => this.drawYAxis(points, size))
      )
      .subscribe();
  }

  private initResizeHandler() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.onDestroy$), debounceTime(300))
      .subscribe(() => this.updateChartDimensions());
  }

  private drawXAxis(points: Point[], chartSize: Size) {
    const { height, width } = chartSize;

    const xDomain = [
      DOMAIN_MULTIPLIER * d3.min(points.map((p) => p.latitude)) - 50,
      DOMAIN_MULTIPLIER * d3.max(points.map((p) => p.latitude)),
    ];
    this.xAxis = d3.scaleLinear().domain(xDomain).range([0, width]);

    d3.select('g.graph__axis.graph__axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(this.xAxis));
  }

  private drawYAxis(points: Point[], chartSize: Size) {
    const { height } = chartSize;

    const yDomain = [
      DOMAIN_MULTIPLIER * d3.min(points.map((p) => p.longtitude)) - 50,
      DOMAIN_MULTIPLIER * d3.max(points.map((p) => p.longtitude)),
    ];
    this.yAxis = d3.scaleLinear().domain(yDomain).range([height, 0]);

    d3.select('g.graph__axis.graph__axis--y').call(d3.axisLeft(this.yAxis));
  }

  private updateChartDimensions() {
    const el = this.wrapperEl.nativeElement;
    setTimeout(() => {
      this.wrapper$.next(el);
    });
  }

  private chartPoint(point: Point): { x: number; y: number } {
    const x = this.xAxis(point.latitude);
    const y = this.yAxis(point.longtitude);
    return { x, y };
  }
}
