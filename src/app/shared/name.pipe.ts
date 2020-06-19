import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {
  transform(value: any): string {
    return typeof value === 'string' ? value.replace('_', ' ') : value;
  }
}
