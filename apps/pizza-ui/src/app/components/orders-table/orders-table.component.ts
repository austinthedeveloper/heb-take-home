import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PizzaOrder } from '@pizza/interfaces';

@Component({
  selector: 'pizza-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTableComponent {
  @Input() orders: PizzaOrder[] = [];
  @Output() actionClicked = new EventEmitter();

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

  onAction(action: string, orderId: number) {
    this.actionClicked.emit({ action, orderId });
  }
}
