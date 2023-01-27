import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { APP_CONTAINERS } from './containers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from '@pizza/ui';
import { PizzaFormsModule } from '@pizza/forms';

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UiModule,
    PizzaFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
