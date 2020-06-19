import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'svgViewBox',
})
export class SvgViewBoxPipe implements PipeTransform {
  transform(value?: { height: number; width: number }): string {
    return value ? `0 0 ${value.width} ${value.height}` : '0 0 0 0';
  }
}
