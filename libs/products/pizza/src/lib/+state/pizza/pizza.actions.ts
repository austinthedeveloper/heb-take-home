import { createAction, props } from '@ngrx/store';
import { PizzaEntity } from './pizza.models';

export const initPizza = createAction('[Pizza Page] Init');

export const loadPizzaSuccess = createAction(
  '[Pizza/API] Load Pizza Success',
  props<{ pizza: PizzaEntity[] }>()
);

export const loadPizzaFailure = createAction(
  '[Pizza/API] Load Pizza Failure',
  props<{ error: any }>()
);
