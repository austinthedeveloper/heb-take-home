import { createAction, props } from '@ngrx/store';
import { Pizza, PizzaOrder } from '@pizza/interfaces';

export const initPizza = createAction('[Pizza Page] Init');

export const loadPizzaSuccess = createAction(
  '[Pizza/API] Load Pizza Success',
  props<{ pizza: PizzaOrder[] }>()
);

export const loadPizzaFailure = createAction(
  '[Pizza/API] Load Pizza Failure',
  props<{ error: any }>()
);

export const setActivePizza = createAction(
  '[Pizza/API] Set Active Pizza',
  props<{ pizzaId: any }>()
);

export const updatePizza = createAction(
  '[Pizza/API] Update Pizza',
  props<{ pizza: PizzaOrder }>()
);

export const updatePizzaSuccess = createAction(
  '[Pizza/API] Update Pizza Success',
  props<{ pizza: PizzaOrder }>()
);

export const updatePizzaFailure = createAction(
  '[Pizza/API] Update Pizza Failure',
  props<{ error: any }>()
);

export const createPizza = createAction(
  '[Pizza/API] Create Pizza',
  props<{ pizza: PizzaOrder }>()
);

export const createPizzaSuccess = createAction(
  '[Pizza/API] Create Pizza Success',
  props<{ pizza: PizzaOrder }>()
);

export const createPizzaFailure = createAction(
  '[Pizza/API] Create Pizza Failure',
  props<{ error: any }>()
);

export const removePizza = createAction(
  '[Pizza/API] Remove Pizza',
  props<{ pizzaId: any }>()
);

export const removePizzaSuccess = createAction(
  '[Pizza/API] Remove Pizza Success',
  props<{ pizzaId: any }>()
);

export const removePizzaFailure = createAction(
  '[Pizza/API] Remove Pizza Failure',
  props<{ error: any }>()
);
