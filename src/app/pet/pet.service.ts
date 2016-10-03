import {Injectable} from '@angular/core';
import {Pet} from './pet';
// import {Http, Response} from '@angular/http';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {getAllMockedPets, getMockedPet} from '../api/MockedPetApi';

@Injectable()
export class PetService {

  constructor(private _http: Http) {
  }

  getAllPets(): Observable<Pet[]> {
    // let url: string = 'http://my.pet.server/v1/pets';

    // return this._http.get(url)
    //   .map((response: Response) => <any[]> response.json())
    //   .do(data => console.log('All: ' + JSON.stringify(data)))
    //   .catch(this.handleError);

    return getAllMockedPets();
  }

  getPet(id: string) {
    return getMockedPet(id);
  }

  // private handleError(error: Response) {
  //   console.error(error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }
}
