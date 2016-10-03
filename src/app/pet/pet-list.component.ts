import {Component, OnInit}  from '@angular/core';
import {Pet} from './pet';
import {PetService} from './pet.service';

@Component({
  selector: 'pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit {
  pageTitle: string = 'Pet Inventory';
  filter: string = 'fifi';
  pets: Pet[];
  errorMessage: string;

  constructor(private _petService: PetService) {
  }

  onKeyPress(event: any): void {
    this.filter = event.target.value;
  }

  ngOnInit(): void {
    this._petService
      .getAllPets()
      .subscribe(
        pets => this.pets = pets,
        error => this.errorMessage = <any>error);
  }
}
