import { ProductDetailsDialogComponent } from './../product-details-dialog/product-details-dialog.component';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    public dialog: MatDialog
  ) {}
  products!: any[];
  product!: any;
  cart: any[] = [];
  history: any[] = [];
  displayHistory: any[] = [];

  addToCart() {
    const ind = this.cart.findIndex((x) => x.id == this.product.id);
    ind < 0 ? this.cart.push({ ...this.product }) : this.cart[ind].qty++;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartService.update();
    this.dialog.open(ProductDetailsDialogComponent, { data: this.product });
  }

  ngOnInit() {
    this.productServ.getProducts().subscribe((products) => {
      this.products = products;
      const id = this.route.snapshot.params.id;
      const ind = this.products.findIndex((x) => x.id == id);
      this.product = this.products[ind];
      this.history = JSON.parse(localStorage.getItem('history') || '[]');
      this.displayHistory = this.history.filter(
        (val) => val.id !== this.product.id
      );
      let exist = false;
      this.history.forEach((val) => {
        if (val.id === this.product.id) exist = true;
      });
      if (!exist) {
        this.history.push(this.product);
      }
      if(this.displayHistory.length>5)this.displayHistory = this.displayHistory.slice(
        this.displayHistory.length - 5,
        this.displayHistory.length
      );
      if(this.history.length>6)this.history=this.history.slice(this.history.length-5, this.history.length);
      localStorage.setItem('history', JSON.stringify(this.history));
    });
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }
}
