import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousands',
})
export class ThousandsPipe implements PipeTransform {
  transform(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
