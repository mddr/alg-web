import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-graph-shell',
  templateUrl: './graph-shell.component.html',
  styleUrls: ['./graph-shell.component.scss'],
})
export class GraphShellComponent implements OnInit, AfterViewInit {
  @ViewChild('graph', { static: false }) graphEl: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
