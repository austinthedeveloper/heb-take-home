import { Action } from '@ngrx/store';
import { Pizza } from '@pizza/interfaces';

import * as PizzaActions from './pizza.actions';
import { PizzaState, initialPizzaState, pizzaReducer } from './pizza.reducer';

describe('Pizza Reducer', () => {
  const createPizzaEntity = (id: string, name = ''): Pizza => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Pizza actions', () => {
    it('loadPizzaSuccess should return the list of known Pizza', () => {
      const pizza = [
        createPizzaEntity('PRODUCT-AAA'),
        createPizzaEntity('PRODUCT-zzz'),
      ];
      const action = PizzaActions.loadPizzaSuccess({ pizza });

      const result: PizzaState = pizzaReducer(initialPizzaState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = pizzaReducer(initialPizzaState, action);

      expect(result).toBe(initialPizzaState);
    });
  });
});
