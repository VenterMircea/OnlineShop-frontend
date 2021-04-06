import { ProductService } from './../../services/product.service';
import { Product } from './../models/product';
import { User } from 'src/app/models/user';
import { CartService } from './../../services/cart.service';
import { OrderService } from './../../services/order.service';
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, AfterViewInit {
  user!: User;
  products: Product[] = [];
  cart!: any;
  orderValue = 0;
  orderObject = Object();
  section = 1;
  confirm = false;
  transportFee = environment.transportFee;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private elementRef: ElementRef,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (Object.keys(this.cart).length > 0) {
      let productsIds = Object.keys(this.cart.products);
      productsIds.forEach((element: string) =>
        this.productService.getProduct(element).subscribe((res) => {
          let product = res;
          product.qty = this.cart.products[res.id];
          this.products.push(product);
          this.orderValue += product.price * product.qty;
          this.orderObject[product.id] = product.qty;
        })
      );
    }
    this.orderValue = parseFloat(this.orderValue.toFixed(2));
  }
  placeOrder() {
    let order = Object();
    order['orderDate'] = new Date();
    order['orderValue'] = this.orderValue;
    order['orderedProducts'] = this.orderObject;
    order['userId'] = this.user.id;
    this.orderService.postOrder(order).subscribe(
      (response: Response) => {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
        localStorage.removeItem('cart');
        this.cartService.update({});
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
  changeSection(sect: any, event: any) {
    this.section = sect;
    event.stopPropagation();
  }
}
