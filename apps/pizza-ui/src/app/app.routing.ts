import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@pizza/services';

import { LoginComponent } from './containers/login/login.component';
import { OrderComponent } from './containers/order/order.component';
import { OrdersComponent } from './containers/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    data: {
      pageTitle: 'Orders',
    },
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard],
    data: {
      pageTitle: 'Order',
    },
  },
  {
    path: 'order/copy/:orderID',
    component: OrderComponent,
    canActivate: [AuthGuard],
    data: {
      pageTitle: 'Copy Order',
      copy: true,
    },
  },
  {
    path: 'order/:orderID',
    component: OrderComponent,
    canActivate: [AuthGuard],
    data: {
      pageTitle: 'Edit Order',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      pageTitle: 'Login',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
