import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pizza-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {}
