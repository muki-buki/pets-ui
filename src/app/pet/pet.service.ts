import {Injectable} from '@angular/core';
import {Pet} from './pet';
import {mockedPetList} from './data/pet-list-data';

@Injectable()
export class PetService {
  getAllPets(): Pet[] {
    return mockedPetList;
  }
}
