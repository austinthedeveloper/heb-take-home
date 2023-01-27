import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaOrder } from '@pizza/interfaces';
import { OrderService } from '@pizza/services';

@Component({
  selector: 'pizza-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  orders$ = this.orderService.items$;
  actions = [
    {
      key: 'Edit',
      value: 'edit',
    },
    {
      key: 'Copy',
      value: 'copy',
    },
    {
      key: 'Remove',
      value: 'remove',
    },
  ];

  constructor(private orderService: OrderService, private router: Router) {}

  onAction(action: string, orderId: number) {
    switch (action) {
      case 'edit':
        this.router.navigate(['/order/', orderId]);
        break;
      case 'copy':
        this.router.navigate(['/order/copy/', orderId]);
        break;
      case 'remove':
        this.orderService.removeOrder(orderId);
        break;
    }
  }
}
