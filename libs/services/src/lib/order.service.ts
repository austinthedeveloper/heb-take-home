import { ORDERS_MOCK } from '@pizza/data';
import { PizzaOrder } from '@pizza/interfaces';
import { Injectable } from '@angular/core';
import { EntityClass } from 'behavior-subject-entities';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends EntityClass<PizzaOrder> {
  constructor() {
    super({ key: (order) => order.Order_ID.toString() });
    this.addMany(ORDERS_MOCK);
  }
}
