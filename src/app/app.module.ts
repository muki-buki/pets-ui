import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routing';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './not-found.component';
import {MaterialModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
