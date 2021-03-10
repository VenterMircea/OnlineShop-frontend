import { element } from 'protractor';
import { CartService } from './../../services/cart.service';
import { OrderService } from './../../services/order.service';
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, AfterViewInit {
  user!: any;
  products!: any;
  orderValue = 0;
  orderObject = Object();
  section=1;
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('cart') || '[]');
    this.user = JSON.parse(localStorage.getItem('user') || '');
    this.products.forEach((val: any) => {
      this.orderValue += val.price * val.qty;
    });
    this.orderValue = parseFloat(this.orderValue.toFixed(2));
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
    this.orderService.postOrder(order).subscribe();
    localStorage.removeItem('cart');
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
  changeSection(sect: any, event: any){
    this.section=sect; 
    event.stopPropagation(); 
  }
}
