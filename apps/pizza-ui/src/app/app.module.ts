import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { APP_CONTAINERS } from './containers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from '@pizza/ui';
import { PizzaFormsModule } from '@pizza/forms';
import { AuthInterceptorService } from '@pizza/services';
import { APP_PIPES } from './pipes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, ...APP_PIPES],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UiModule,
    PizzaFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: 'environment', useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
