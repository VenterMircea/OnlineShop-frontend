import { CartService } from './../../services/cart.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products!: any[];
  total = 0;
  selected = 'option1';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('cart') || '[]');
    this.computeTotal();
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
    this.products.forEach((val: any) => {
      this.total += val.price * val.qty;
    });
  }
}
