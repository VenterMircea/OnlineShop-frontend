import { Product } from './../../models/product';
import { ProductDetailsDialogComponent } from './../product-details-dialog/product-details-dialog.component';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productServ: ProductService,
    private cartService: CartService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  products!: any[];
  product!: any;
  cart: any[] = [];
  history: any[] = [];
  displayHistory: any[] = [];
  id = this.route.snapshot.params.id;

  addToCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const ind = this.cart.findIndex((x) => x.id == this.product.id);
    ind < 0
      ? this.cart.push({ ...this.product, qty: 1 })
      : this.cart[ind].qty++;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartService.update();
  }
  openDialog() {
    this.dialog.open(ProductDetailsDialogComponent, { data: this.product });
  }

  handleHistory(product: any) {
    this.history = JSON.parse(localStorage.getItem('history') || '[]');
    this.displayHistory = this.history.filter((val) => val.id !== product.id);
    this.displayHistory = this.displayHistory.reverse();
    let exist = false;
    this.history.forEach((val) => {
      if (val.id === product.id) exist = true;
    });
    if (!exist) {
      this.history.push(product);
    }
    if (this.displayHistory.length > 5) {
      this.displayHistory = this.displayHistory.slice(
        this.displayHistory.length - 5,
        this.displayHistory.length
      );
    }
    if (this.history.length > 6) {
      this.history = this.history.slice(
        this.history.length - 5,
        this.history.length
      );
    }
    localStorage.setItem('history', JSON.stringify(this.history));
  }

  ngOnInit() {
    this.productServ.getProduct(this.id).subscribe((product) => {
      this.product = product;
      this.handleHistory(product);
    });
  }
}
