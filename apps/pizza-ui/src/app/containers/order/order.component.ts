import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PIZZA_TABLES, PIZZA_SIZES, PIZZA_CRUST } from '@pizza/data';
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
  tables = PIZZA_TABLES;
  sizes = PIZZA_SIZES;
  crusts = PIZZA_CRUST;

  form = this.fb.group({
    Crust: this.fb.control('', Validators.required),
    Flavor: this.fb.control('', Validators.required),
    // Order_ID: this.fb.control<number | undefined>(undefined),
    Size: this.fb.control('', Validators.required),
    Table_No: this.fb.control<number>(1, Validators.required),
  });

  private orderId$ = this.route.params.pipe(
    map((params) => params['orderID']),
    filter((orderId) => !!orderId)
  );

  private sub!: Subscription;
  private canCopy = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute
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
        tap((res) => {
          this.canCopy = !!this.route.snapshot.data['copy'];
          console.log('FIRE', res, this.canCopy);
        }),
        switchMap((orderId) => this.orderService.getOne(orderId)),
        tap((order) => this.patchForm(order))
      )
      .subscribe();
  }

  private patchForm(order: PizzaOrder) {
    this.form.patchValue(order);
  }
}
