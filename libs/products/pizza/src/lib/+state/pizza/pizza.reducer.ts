import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Pizza } from '@pizza/interfaces';

import * as PizzaActions from './pizza.actions';

export const PIZZA_FEATURE_KEY = 'pizza';

export interface PizzaState extends EntityState<Pizza> {
  selectedId?: string | number; // which Pizza record has been selected
  loaded: boolean; // has the Pizza list been loaded
  error?: string | null; // last known error (if any)
}

export interface PizzaPartialState {
  readonly [PIZZA_FEATURE_KEY]: PizzaState;
}

export const pizzaAdapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>();

export const initialPizzaState: PizzaState = pizzaAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialPizzaState,
  on(PizzaActions.initPizza, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PizzaActions.loadPizzaSuccess, (state, { pizza }) =>
    pizzaAdapter.setAll(pizza, { ...state, loaded: true })
  ),
  on(PizzaActions.loadPizzaFailure, (state, { error }) => ({ ...state, error }))
);

export function pizzaReducer(state: PizzaState | undefined, action: Action) {
  return reducer(state, action);
}
