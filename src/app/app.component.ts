import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'online-store';
  cart: any = [];
  subscrption = this.cartService.currentCart.subscribe(
    (cart) => (this.cart = cart)
  );
  constructor(private cartService: CartService) {}
}
