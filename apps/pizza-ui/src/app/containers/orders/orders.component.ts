import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderService } from '@pizza/services';

@Component({
  selector: 'pizza-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  orders$ = this.orderService.items$;

  constructor(private orderService: OrderService) {}
}
