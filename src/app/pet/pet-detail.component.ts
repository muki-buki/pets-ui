import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Pet} from './pet';
import {PetService} from './pet.service';

@Component({
  templateUrl: './pet-detail.component.html'
})
export class PetDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Pet Details';
  pet: Pet;
  errorMessage: string;
  subscription: any;

  constructor(private _petService: PetService,
              private _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.pet) {
      return;
    }

    this.subscription = this._route.params.subscribe(params => {
      this._petService.getPet(params['id'])
        .subscribe(
          pet => this.pet = pet,
          error => this.errorMessage = <any>error);
    });
  }

  onBack(): void {
    this._router.navigate(['pets']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
