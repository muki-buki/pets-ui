import {AfterContentInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MdSidenav} from '@angular/material';

import {views} from './app-views';

@Component({
  selector: 'pet-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterContentInit {
  message = 'Hello from the app component';
  views = views;
  sideNavMode = 'side';
  @ViewChild(MdSidenav) sidenav: MdSidenav;

  constructor(public route: ActivatedRoute,
              public router: Router) {
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.sidenav.open();
    });
  }

  activate(event) {
    console.log('Activate Event:', event);
  }

  deactivate(event) {
    console.log('Deactivate Event', event);
  }
}
