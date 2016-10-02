import { Routes } from '@angular/router';
import { PetListComponent } from './pet-list.component';

export const routes: Routes = [
  {
    path: '', // relative to the path defined in ../app.routing.ts
    component: PetListComponent
  }
];
