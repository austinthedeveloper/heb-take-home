import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PizzaOrder } from '@pizza/interfaces';
import { OrderService } from '@pizza/services';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { updatePizza, createPizza } from '@pizza/products/pizza';

@Component({
  selector: 'pizza-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  loading$ = this.orderService.saving$;

  form!: FormGroup;

  private orderId$ = this.route.params.pipe(
    map((params) => params['orderID']),
    filter((orderId) => !!orderId)
  );

  order$: Observable<PizzaOrder> = this.orderId$.pipe(
    tap((orderId) => {
      this.canCopy = !!this.route.snapshot.data['copy'];
      this.id = orderId;
    }),
    switchMap((orderId) => this.orderService.getOne(orderId))
  );

  private canCopy = false;
  private id!: number;

  constructor(
    private fb: NonNullableFormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

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
