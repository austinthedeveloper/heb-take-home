import { ORDERS_MOCK } from '@pizza/data';
import { EnvironmentUI, PizzaOrder } from '@pizza/interfaces';
import { Inject, Injectable } from '@angular/core';
import { EntityClass } from 'behavior-subject-entities';
import {
  BehaviorSubject,
  finalize,
  first,
  map,
  of,
  tap,
  Observable,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends EntityClass<PizzaOrder> {
  private apiUrl = `${this.environment.apiUrl}orders`;
  private saving = new BehaviorSubject(false);
  saving$ = this.saving.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('environment') private environment: EnvironmentUI
  ) {
    super({ key: (order) => order.Order_ID.toString() });
  }

  getOrders() {
    return this.http
      .get<PizzaOrder[]>(this.apiUrl)
      .pipe(tap((orders) => this.addMany(orders)));
  }

  removeOrder(orderId: number): Observable<number> {
    return this.http.delete(`${this.apiUrl}/${orderId}`).pipe(
      tap(() => this.removeOne(`${orderId}`)),
      map(() => orderId)
    );
  }

  /**
   * This is faked since there is no UPDATE endpoint
   *
   * @param {PizzaOrder} order
   * @return {*}
   * @memberof OrderService
   */
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
    return this.http.post<PizzaOrder>(this.apiUrl, order).pipe(
      finalize(() => this.toggleSaving(false)),
      tap((res) => this.addOne(res))
    );
  }

  toggleSaving(value: boolean) {
    this.saving.next(value);
  }
}
