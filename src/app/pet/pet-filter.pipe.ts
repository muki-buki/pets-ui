import {PipeTransform, Pipe} from '@angular/core';
import {Pet} from './pet';

@Pipe({
  name: 'petFilter'
})
export class PetFilterPipe implements PipeTransform {

  transform(value: Pet[], args: string[]): Pet[] {
    let filter: string = args[0];
    if (!filter) {
      return value;
    }

    filter = filter.toLowerCase();

    return value
      .filter((pet: Pet) => pet.name.toLocaleLowerCase().indexOf(filter) !== -1);
  }

}
