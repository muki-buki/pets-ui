import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {routes} from './pets.routing';
import {PetListComponent} from './pet-list.component';
import {PetService} from './pet.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    PetListComponent
  ],
  providers: [
    PetService
  ]
})
export class PetsModule {
}

