import { OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import appConstants from '../util/constants';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  order: {} = {
    Airlines: appConstants['Airlines'],
    Departure: appConstants['Departure'],
    Duration: appConstants['Duration'],
    Arrival: appConstants['Arrival']
  };

  transform(value: any, sortCol: string, sortDir: string): any {
    console.log(sortCol, sortDir);
    if (value) {
      if (value.length === 0) {
        return value;
      }
      console.log('SortCol Value', value[0][this.order[sortCol]]);
      value.sort((a, b) => {
        let order;
        if (sortCol === 'Price') {
          order = a.fare.totalfare - b.fare.totalfare;
        } else {
          order = a[this.order[sortCol]] > b[this.order[sortCol]] ? 1 : -1;
        }
        return sortDir === 'asc' ? order : -order;
      });
    }
    console.log('Value : ', value);
    return value;
  }

}
