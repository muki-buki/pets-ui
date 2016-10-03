import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '@angular/material';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {PetListComponent} from './pet-list.component';
import {routes} from '../app.routing';

import 'rxjs/add/operator/takeUntil';
import {NotFoundComponent} from '../not-found.component';
import {mockedPetList} from '../api/pet-list-data';

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [],
      declarations: [PetListComponent, DashboardComponent, NotFoundComponent]
    });
  });

  it('should contain the same number of pets as in the mocked set', async(() => {
    const fixture = TestBed.createComponent(PetListComponent);
    fixture.detectChanges();

    let items = fixture.nativeElement.querySelectorAll('md-list-item');
    expect(items.length).toEqual(mockedPetList.length);
    expect(fixture.nativeElement).not.toContainText('Welcome to the Dashboard');
  }));

});
