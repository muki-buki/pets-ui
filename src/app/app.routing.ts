import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './not-found.component';

export const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'pets', loadChildren: './pet/index#PetsModule'},
  {path: '**', component: NotFoundComponent}
];
