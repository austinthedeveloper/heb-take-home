import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as PizzaActions from './pizza.actions';
import * as PizzaFeature from './pizza.reducer';

import { switchMap, catchError, of, tap } from 'rxjs';
import { OrderService } from '@pizza/services';

@Injectable()
export class PizzaEffects {
  private actions$ = inject(Actions);

  constructor(private orderService: OrderService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaActions.initPizza),
      switchMap(() => this.orderService.getOrders()),
      switchMap((pizzas) =>
        of(PizzaActions.loadPizzaSuccess({ pizza: pizzas }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(PizzaActions.loadPizzaFailure({ error }));
      })
    )
  );
  updatePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaActions.updatePizza),
      switchMap((props) => this.orderService.saveOrder(props.pizza)),
      switchMap((pizza) => of(PizzaActions.updatePizzaSuccess({ pizza }))),
      catchError((error) => {
        console.error('Error', error);
        return of(PizzaActions.updatePizzaFailure({ error }));
      })
    )
  );
  createPizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaActions.createPizza),
      switchMap((props) => this.orderService.createOrder(props.pizza)),
      switchMap((pizza) => of(PizzaActions.createPizzaSuccess({ pizza }))),
      catchError((error) => {
        console.error('Error', error);
        return of(PizzaActions.createPizzaFailure({ error }));
      })
    )
  );
}
