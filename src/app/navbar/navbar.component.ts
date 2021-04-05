import { User } from 'src/app/models/user';
import { Product } from './../models/product';
import { Router } from '@angular/router';
import { SearchService } from './../../services/search.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cart: Product[] = [];
  searchTerm = '';
  qty = 0;
  userLogged!: boolean;
  user!: User;
  userOptions = false;
  subscrption = this.cartService.currentCart.subscribe((cart) => {
    this.cart = cart;
    this.qty = this.cart.reduce((acc: any, val: any) => acc + val.qty, 0);
  });
  constructor(
    private cartService: CartService,
    private searchService: SearchService,
    private router: Router
  ) { }

  changeSearchTerm(event: any) {
    this.searchTerm = event.target.value;
    this.searchService.changeTerm(this.searchTerm);
  }
  signout() {
    localStorage.removeItem('user');
    this.userOptions = false;
    localStorage.hasOwnProperty('user')
      ? (this.userLogged = true)
      : (this.userLogged = false);
    this.router.navigate(['/']);
  }
  ngOnInit() {
    localStorage.hasOwnProperty('user')
      ? (this.userLogged = true)
      : (this.userLogged = false);
    this.user = JSON.parse(localStorage.getItem('user') || '[]');
  }
  goToLogin() {
    this.router.navigate(['/account/login'], {
      state: { redirect: this.router.url },
    });
  }
}
