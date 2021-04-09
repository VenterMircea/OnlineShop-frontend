import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { SearchService } from './../../services/search.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cart: any;
  searchTerm = '';
  qty = 0;
  qtyEmitter$ = new BehaviorSubject<number>(this.qty);
  userLogged!: boolean;
  user!: User;
  userLanguage='';
  userOptions = false;
  constructor(
    private cartService: CartService,
    private searchService: SearchService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs(['ro', 'en', 'de']);
    if(localStorage.hasOwnProperty('lang'))
      this.userLanguage=JSON.parse(localStorage.getItem('lang') || 'null');
    let browserLang:string;
    if(this.userLanguage!='') browserLang=this.userLanguage;
    else browserLang = translate.getBrowserLang();
    translate.setDefaultLang(browserLang);
    translate.use(browserLang.match(/ro|en|de/) ? browserLang : 'en');
  }

  changeSearchTerm(event: any) {
    this.searchTerm = event.target.value;
    this.searchService.changeTerm(this.searchTerm);
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', JSON.stringify(lang));
  }

  signout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    this.cartService.update({});
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
    this.cartService.currentCart.subscribe((cart) => {
      this.cart = cart;
      this.qty = 0;
      for (let key in this.cart.products) this.qty += this.cart.products[key];
      this.qtyEmitter$.next(this.qty);
    });
  }

  goToLogin() {
    this.router.navigate(['/account/login'], {
      state: { redirect: this.router.url },
    });
  }
}
