import { SearchService } from './../services/search.service';
import { CartService } from './../services/cart.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'online-store';
  cart: any = [];
  searchTerm = '';
  qty = 0;
  subscrption = this.cartService.currentCart.subscribe((cart) => {
    this.cart = cart;
    console.log(cart);
    this.qty = this.cart.reduce((acc: any, val: any) => acc + val.qty, 0);
  });
  constructor(
    private cartService: CartService,
    private searchService: SearchService
  ) {}

  changeSearchTerm(event: any) {
    this.searchTerm = event.target.value;
    this.searchService.changeTerm(this.searchTerm);
  }
}
