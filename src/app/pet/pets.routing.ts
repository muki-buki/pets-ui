import {Routes} from '@angular/router';
import {PetListComponent} from './pet-list.component';
import {PetDetailComponent} from './pet-detail.component';

export const routes: Routes = [
  {
    path: '', // relative to the path defined in ../app.routing.ts
    component: PetListComponent
  }, {
    path: ':id',
    component: PetDetailComponent
  }
];
