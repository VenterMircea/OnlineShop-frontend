import { CartService } from './../../services/cart.service';
import { OrderService } from './../../services/order.service';
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

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
  section = 1;
  confirm = false;
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
    this.orderService.postOrder(order).subscribe(
      (response: Response) => {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
        localStorage.removeItem('cart');
        this.cartService.update();
      },
      error => {
        console.log(error);
      } 
    );

    ;
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
