import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as PizzaActions from './pizza.actions';
import { PizzaEffects } from './pizza.effects';

describe('PizzaEffects', () => {
  let actions: Observable<Action>;
  let effects: PizzaEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PizzaEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(PizzaEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PizzaActions.initPizza() });

      const expected = hot('-a-|', {
        a: PizzaActions.loadPizzaSuccess({ pizza: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
