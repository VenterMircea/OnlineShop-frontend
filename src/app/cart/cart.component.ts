import { CartService } from './../../services/cart.service';
import { Product } from './../models/product';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterViewInit {
  products!: any[];
  total = 0;
  selected = 'option1';

  constructor(private cartService: CartService, private elementRef: ElementRef,) {}

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('cart') || '[]');
    this.computeTotal();
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
  modifyQuantity(id: number, diff: number) {
    this.products.forEach((val) => {
      if (val.id === id) val.qty = val.qty + diff;
      localStorage.setItem('cart', JSON.stringify(this.products));
    });
    this.computeTotal();
    localStorage.setItem('cart', JSON.stringify(this.products));
    this.cartService.update();
  }
  computeTotal() {
    this.total=0;
    this.products.forEach((val: any) => {
      this.total += val.price * val.qty;
    });
    this.total=parseFloat(this.total.toFixed(2));
  }
}
