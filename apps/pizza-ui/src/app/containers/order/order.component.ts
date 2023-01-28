import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PIZZA_TABLES,
  PIZZA_SIZES,
  PIZZA_CRUST,
  PIZZA_FLAVORS,
} from '@pizza/data';
import { PizzaOrder } from '@pizza/interfaces';
import { OrderService } from '@pizza/services';
import { filter, map, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'pizza-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnDestroy {
  loading$ = this.orderService.saving$;

  tables = PIZZA_TABLES;
  sizes = PIZZA_SIZES;
  crusts = PIZZA_CRUST;
  flavors = PIZZA_FLAVORS;

  form = this.fb.group({
    Crust: this.fb.control('', Validators.required),
    Flavor: this.fb.control('', Validators.required),
    Size: this.fb.control('', Validators.required),
    Table_No: this.fb.control<number>(1, Validators.required),
  });

  private orderId$ = this.route.params.pipe(
    map((params) => params['orderID']),
    filter((orderId) => !!orderId)
  );

  private sub!: Subscription;
  private canCopy = false;
  private id!: number;

  constructor(
    private fb: NonNullableFormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.setSub();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private setSub() {
    this.sub = this.orderId$
      .pipe(
        tap((orderId) => {
          this.canCopy = !!this.route.snapshot.data['copy'];
          this.id = orderId;
        }),
        switchMap((orderId) => this.orderService.getOne(orderId)),
        tap((order) => this.patchForm(order))
      )
      .subscribe();
  }

  private patchForm(order: PizzaOrder) {
    this.form.patchValue(order);
  }

  // TODO: I had to force these Partials to act as a full Interface which they are
  submitForm(order: Partial<PizzaOrder>) {
    let call = this.orderService.createOrder(order as PizzaOrder);
    if (this.id && !this.canCopy) {
      call = this.orderService.saveOrder({
        ...order,
        Order_ID: this.id,
      } as PizzaOrder);
    }

    call.subscribe(() => {
      this.router.navigate(['/orders']);
    });
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
