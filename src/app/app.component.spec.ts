import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './not-found.component';
import {routes} from './app.routing';

import 'rxjs/add/operator/takeUntil';

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [],
      declarations: [AppComponent, DashboardComponent, NotFoundComponent]
    });
  });

  it('should contain Dashboard text', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).not.toContainText('Welcome to the Dashboard');
  }));

});
