// import {delay} from './delay'; TODO figure out how to delay the fullfilment
import {mockedPetList} from './pet-list-data';
import {Observable} from 'rxjs/Observable';
import {Pet} from '../pet/pet';

export function getAllMockedPets(): Observable<Pet[]> {
  return Observable
    .of(mockedPetList);
}
