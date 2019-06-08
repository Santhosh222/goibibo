import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseCus'
})
export class UppercaseCusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return String(value).substr(0, 1).toUpperCase() + String(value).substr(1);
  }

}
