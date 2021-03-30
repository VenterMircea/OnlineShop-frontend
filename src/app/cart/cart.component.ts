import { Product } from './../models/product';
import { AccountService } from './../../services/account.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterViewInit {
  products!: Product[];
  total = 0;
  selected = 'option1';
  user: any;
  transportFee=environment.transportFee;

  constructor(
    private cartService: CartService,
    private elementRef: ElementRef,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('cart') || '[]');
    this.computeTotal();
    this.user = this.accountService.userValue;
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
  deleteFromCart(id: any) {
    this.products = this.products.filter((product) => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(this.products));
    this.computeTotal();
    this.cartService.update();
  }
  modifyQuantity(id: any, diff: number) {
    this.products.forEach((val) => {
      if (val.id === id)
       {if (val.qty!=1 || diff==1) val.qty = val.qty + diff;
        else this.deleteFromCart(id);
       }
      localStorage.setItem('cart', JSON.stringify(this.products));
    });
    this.computeTotal();
    localStorage.setItem('cart', JSON.stringify(this.products));
    this.cartService.update();
  }
  computeTotal() {
    this.total = 0;
    this.products.forEach((val: any) => {
      this.total += val.price * val.qty;
    });
    this.total = parseFloat(this.total.toFixed(2));
  }
  changeRoute() {
    if (!this.user)
      this.router.navigate(['account/login'], {
        state: { redirect: this.router.url },
      });
    else this.router.navigate(['order']);
  }
}
