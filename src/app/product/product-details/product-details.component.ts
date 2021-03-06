import { Product } from './../../models/product';
import { ProductDetailsDialogComponent } from './../product-details-dialog/product-details-dialog.component';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { cartBE } from './../../models/cartBE';
import { first } from 'rxjs/operators';

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
  products!: Product[];
  product!: Product;
  cart = new cartBE();
  history: Product[] = [];
  displayHistory: Product[] = [];
  id = this.route.snapshot.params.id;
  qty = 1;

  addToCart() {
    this.cartService.currentCart.pipe(first()).subscribe((res) => {
      if (Object.keys(res).length !== 0) this.cart = res;
      let existInCart = false;
      for (let key in this.cart.products)
        if (key === this.product.id) {
          this.cart.products[key] += this.qty;
          existInCart = true;
        }
      if (!existInCart) {
        this.cart.products[this.product.id] = this.qty;
        if (localStorage.hasOwnProperty('user'))
          this.cart.userId = JSON.parse(
            localStorage.getItem('user') || '{}'
          ).id;
      }
      if (this.cart.products != null) delete this.cart.products[''];
      this.cartService.update(this.cart);
    });
  }
  openDialog() {
    this.dialog.open(ProductDetailsDialogComponent, { data: this.product });
  }
  modifyQuantity(val: number) {
    if (!(val === -1 && this.qty === 1)) this.qty += val;
  }
  //add to history the current product
  //display from history only 5 products and exclude current product
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
