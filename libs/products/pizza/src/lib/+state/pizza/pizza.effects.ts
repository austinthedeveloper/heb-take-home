import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as PizzaActions from './pizza.actions';
import * as PizzaFeature from './pizza.reducer';

import { switchMap, catchError, of } from 'rxjs';

@Injectable()
export class PizzaEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaActions.initPizza),
      switchMap(() => of(PizzaActions.loadPizzaSuccess({ pizza: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(PizzaActions.loadPizzaFailure({ error }));
      })
    )
  );
}
