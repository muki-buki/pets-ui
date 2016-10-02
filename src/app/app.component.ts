import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router,} from '@angular/router';


@Component({
  selector: 'pet-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent{
  message = 'Hello from the app component';

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {}
}
