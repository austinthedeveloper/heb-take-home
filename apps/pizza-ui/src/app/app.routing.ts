import { LoginComponent } from './containers/login/login.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './containers/order/order.component';
import { AuthGuard, OrdersResolver } from '@pizza/services';

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
    resolve: [OrdersResolver],
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
