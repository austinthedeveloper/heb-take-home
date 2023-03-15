import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PizzaOrder } from '@pizza/interfaces';
import {
  createPizza,
  selectEntity,
  setActivePizza,
  updatePizza,
} from '@pizza/products/pizza';
import { filter, map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'pizza-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  form!: FormGroup;

  private orderId$ = this.route.params.pipe(
    map((params) => params['orderID']),
    filter((orderId) => !!orderId)
  );

  order$: Observable<PizzaOrder | undefined> = this.orderId$.pipe(
    tap((orderId) => {
      this.canCopy = !!this.route.snapshot.data['copy'];
      this.id = orderId;
      this.store.dispatch(setActivePizza({ pizzaId: this.id }));
    }),
    switchMap((orderId) => this.store.select(selectEntity))
  );

  private canCopy = false;
  private id!: number;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.store.select(selectEntity).subscribe((res) => console.log('res', res));
  }

  onFormReady(form: FormGroup) {
    this.form = form;
  }

  // TODO: I had to force these Partials to act as a full Interface which they are
  submitForm(order: Partial<PizzaOrder>) {
    // TODO: Table_No keeps converting to a string
    const updatedOrder = {
      ...order,
      Table_No: +(order.Table_No as number),
    };
    if (this.id && !this.canCopy) {
      this.store.dispatch(
        updatePizza({
          pizza: {
            ...updatedOrder,
            Order_ID: this.id,
          } as PizzaOrder,
        })
      );
    } else {
      this.store.dispatch(
        createPizza({
          pizza: updatedOrder as PizzaOrder,
        })
      );
    }
  }

  // TODO: Convert to a pipe so it doesn't fire as often
  get submitText(): string {
    let result = 'Create Order';
    if (this.canCopy) {
      result = 'Copy Order';
    } else if (this.id) {
      result = 'Save Order';
    }
    return result;
  }
}
