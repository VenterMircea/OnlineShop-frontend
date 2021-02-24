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

  addToCart() {
    const ind = this.cart.findIndex((x) => x.id == this.product.id);
    ind < 0 ? this.cart.push({ ...this.product }) : this.cart[ind].qty++;
    console.log(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartService.update();
    this.dialog.open(ProductDetailsDialogComponent, { data: this.product });
  }

  ngOnInit() {
    this.productServ.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
      const id = this.route.snapshot.params.id;
      const ind = this.products.findIndex((x) => x.id == id);
      console.log(ind);
      this.product = this.products[ind];
    });
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }
}
