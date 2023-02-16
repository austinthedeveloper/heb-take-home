import { createAction, props } from '@ngrx/store';
import { Pizza } from '@pizza/interfaces';

export const initPizza = createAction('[Pizza Page] Init');

export const loadPizzaSuccess = createAction(
  '[Pizza/API] Load Pizza Success',
  props<{ pizza: Pizza[] }>()
);

export const loadPizzaFailure = createAction(
  '[Pizza/API] Load Pizza Failure',
  props<{ error: any }>()
);
