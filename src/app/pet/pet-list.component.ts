import {Component, OnInit}  from '@angular/core';
import {Pet} from './pet';
import {mockedPetList} from './data/pet-list-data';

@Component({
  selector: 'pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit {
  pageTitle: string = 'Pet Inventory';
  // temporary load mocked data
  pets: Pet[] = mockedPetList;

  ngOnInit(): void {
    // TODO retrieve the pets through an api
  }
}
