import { PizzaEntity } from './pizza.models';
import {
  pizzaAdapter,
  PizzaPartialState,
  initialPizzaState,
} from './pizza.reducer';
import * as PizzaSelectors from './pizza.selectors';

describe('Pizza Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPizzaId = (it: PizzaEntity) => it.id;
  const createPizzaEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PizzaEntity);

  let state: PizzaPartialState;

  beforeEach(() => {
    state = {
      pizza: pizzaAdapter.setAll(
        [
          createPizzaEntity('PRODUCT-AAA'),
          createPizzaEntity('PRODUCT-BBB'),
          createPizzaEntity('PRODUCT-CCC'),
        ],
        {
          ...initialPizzaState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Pizza Selectors', () => {
    it('selectAllPizza() should return the list of Pizza', () => {
      const results = PizzaSelectors.selectAllPizza(state);
      const selId = getPizzaId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = PizzaSelectors.selectEntity(state) as PizzaEntity;
      const selId = getPizzaId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectPizzaLoaded() should return the current "loaded" status', () => {
      const result = PizzaSelectors.selectPizzaLoaded(state);

      expect(result).toBe(true);
    });

    it('selectPizzaError() should return the current "error" state', () => {
      const result = PizzaSelectors.selectPizzaError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
