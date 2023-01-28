import { ORDERS_MOCK } from '@pizza/data';
import { PizzaOrder } from '@pizza/interfaces';
import { Injectable } from '@angular/core';
import { EntityClass } from 'behavior-subject-entities';
import { BehaviorSubject, finalize, first, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends EntityClass<PizzaOrder> {
  private saving = new BehaviorSubject(false);
  saving$ = this.saving.asObservable();

  constructor() {
    super({ key: (order) => order.Order_ID.toString() });
    this.addMany(ORDERS_MOCK);
  }

  removeOrder(orderId: number) {
    this.removeOne(`${orderId}`);
  }

  saveOrder(order: PizzaOrder) {
    this.toggleSaving(true);
    return of(order).pipe(
      first(),
      finalize(() => this.toggleSaving(false)),
      tap((res) =>
        this.updateOne({ ...res, Timestamp: new Date().toISOString() })
      )
    );
  }
  createOrder(order: PizzaOrder) {
    this.toggleSaving(true);
    const Order_ID = this.snapshot.items.length + 1;
    return of(order).pipe(
      first(),
      finalize(() => this.toggleSaving(false)),
      tap((res) =>
        this.addOne({ ...res, Order_ID, Timestamp: new Date().toISOString() })
      )
    );
  }

  toggleSaving(value: boolean) {
    this.saving.next(value);
  }
}
