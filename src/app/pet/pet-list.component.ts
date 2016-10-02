import {Component, OnInit}  from '@angular/core';
import {Pet} from './pet';
import {mockedPetList} from './data/pet-list-data';
import {PetService} from './pet.service';

@Component({
  selector: 'pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit {
  pageTitle: string = 'Pet Inventory';
  pets: Pet[];

  constructor(private _petService: PetService) {
  }

  ngOnInit(): void {
    this.pets = this._petService.getAllPets();
  }
}
