import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PIZZA_FEATURE_KEY, PizzaState, pizzaAdapter } from './pizza.reducer';

// Lookup the 'Pizza' feature state managed by NgRx
export const selectPizzaState =
  createFeatureSelector<PizzaState>(PIZZA_FEATURE_KEY);

const { selectAll, selectEntities } = pizzaAdapter.getSelectors();

export const selectPizzaLoaded = createSelector(
  selectPizzaState,
  (state: PizzaState) => state.loaded
);

export const selectPizzaError = createSelector(
  selectPizzaState,
  (state: PizzaState) => state.error
);

export const selectAllPizza = createSelector(
  selectPizzaState,
  (state: PizzaState) => selectAll(state)
);

export const selectPizzaEntities = createSelector(
  selectPizzaState,
  (state: PizzaState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectPizzaState,
  (state: PizzaState) => state.selectedId
);

export const selectEntity = createSelector(
  selectPizzaEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
