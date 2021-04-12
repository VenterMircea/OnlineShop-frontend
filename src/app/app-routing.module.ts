import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { OrderItemComponent } from './user-details/order-item/order-item.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { OrderComponent } from './order/order.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';

import { CartComponent } from './cart/cart.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'order', component: OrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'account/details', component: UserDetailsComponent },
  { path: 'order/:id', component: OrderItemComponent },
  { path: 'success', component: PaymentSuccessComponent },
  { path: 'failure', component: PaymentFailureComponent },
  {
    path: 'userConfirmation',
    component: ConfirmAccountComponent,
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
