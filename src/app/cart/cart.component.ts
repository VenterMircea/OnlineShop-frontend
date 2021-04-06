import { ProductService } from './../../services/product.service';
import { Product } from './../models/product';
import { AccountService } from './../../services/account.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterViewInit {
  cart!: any;
  products: Product[] = [];
  total = 0;
  selected = 'option1';
  user: any;
  transportFee = environment.transportFee;

  constructor(
    private cartService: CartService,
    private elementRef: ElementRef,
    private accountService: AccountService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.user = this.accountService.userValue;
    this.cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (Object.keys(this.cart).length > 0) {
      let productsIds = Object.keys(this.cart.products);
      productsIds.forEach((element: string) =>
        this.productService.getProduct(element).subscribe((res) => {
          let product = res;
          product.qty = this.cart.products[res.id];
          this.products.push(product);
          this.computeTotal();
        })
      );
    }
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
  deleteFromCart(id: any) {
    this.products = this.products.filter((product: any) => product.id !== id);
    delete this.cart.products[id];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.computeTotal();
    this.cartService.update(this.cart);
  }
  modifyQuantity(id: any, diff: number) {
    this.products.forEach((val: any) => {
      if (val.id === id) {
        if (val.qty != 1 || diff == 1) {
          val.qty = val.qty + diff;
          this.cart.products[id] += diff;
        } else this.deleteFromCart(id);
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    });
    this.computeTotal();
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartService.update(this.cart);
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
