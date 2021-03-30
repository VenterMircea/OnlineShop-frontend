import { Product } from './../models/product';
import { User } from 'src/app/models/user';
import { CartService } from './../../services/cart.service';
import { OrderService } from './../../services/order.service';
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, AfterViewInit {
  user!: User;
  products!: Product[];
  orderValue = 0;
  orderObject = Object();
  section = 1;
  confirm = false;
  transportFee=environment.transportFee;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private elementRef: ElementRef,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('cart') || '[]');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.products.forEach((val: any) => {
      this.orderValue += val.price * val.qty;
    });
    this.orderValue = parseFloat(this.orderValue.toFixed(2))+this.transportFee;
    this.products.forEach((element: any) => {
      this.orderObject[element.id] = element.qty;
    });
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
        this.cartService.update();
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
