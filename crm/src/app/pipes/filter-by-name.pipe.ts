import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(value: any[], filter: string): any[] {
    return value.filter(item =>
      String(item.name).toLowerCase().includes(filter.toLowerCase())
    ) ?? [];
  }

}
