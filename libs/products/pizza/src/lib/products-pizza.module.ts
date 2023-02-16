import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPizza from './+state/pizza/pizza.reducer';
import { PizzaEffects } from './+state/pizza/pizza.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromPizza.PIZZA_FEATURE_KEY, fromPizza.pizzaReducer),
    EffectsModule.forFeature([PizzaEffects]),
  ],
})
export class ProductsPizzaModule {}
