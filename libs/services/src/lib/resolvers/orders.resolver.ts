import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PizzaOrder } from '@pizza/interfaces';
import { first, Observable } from 'rxjs';
import { OrderService } from '../order.service';

/**
 * Only Retrieve the items one time
 *
 * @export
 * @class OrdersResolver
 * @implements {Resolve<PizzaOrder[]>}
 */
@Injectable({ providedIn: 'root' })
export class OrdersResolver implements Resolve<PizzaOrder[]> {
  constructor(private service: OrderService) {}

  resolve(): Observable<PizzaOrder[]> {
    return this.service.snapshot.items.length
      ? this.service.items$.pipe(first())
      : this.service.getOrders();
  }
}
