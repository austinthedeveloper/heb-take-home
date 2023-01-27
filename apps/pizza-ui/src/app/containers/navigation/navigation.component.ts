import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pizza-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  links = [
    {
      key: 'Home',
      value: '/orders',
    },
    {
      key: 'New Order',
      value: '/order',
    },
  ];
}
