import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times',
})
export class TimesPipe implements PipeTransform {
  transform(value: number): string {
    const minutes = Math.floor(value / 60000);
    const seconds = ((value % 60000) / 1000).toFixed(0);
    return (
      minutes + ':' + ((seconds as unknown as number) < 10 ? '0' : '') + seconds
    );
  }
}
