import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EnvironmentUI, PizzaOrder } from '@pizza/interfaces';
import { BehaviorSubject, finalize, first, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${this.environment.apiUrl}orders`;
  private saving = new BehaviorSubject(false);
  saving$ = this.saving.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('environment') private environment: EnvironmentUI
  ) {}

  getOrders() {
    return this.http.get<PizzaOrder[]>(this.apiUrl);
  }

  removeOrder(orderId: number): Observable<number> {
    return this.http
      .delete(`${this.apiUrl}/${orderId}`)
      .pipe(map(() => orderId));
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
      finalize(() => this.toggleSaving(false))
    );
  }
  createOrder(order: PizzaOrder) {
    this.toggleSaving(true);
    return this.http
      .post<PizzaOrder>(this.apiUrl, order)
      .pipe(finalize(() => this.toggleSaving(false)));
  }

  toggleSaving(value: boolean) {
    this.saving.next(value);
  }
}
