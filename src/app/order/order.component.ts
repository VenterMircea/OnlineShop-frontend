import { element } from 'protractor';
import { CartService } from './../../services/cart.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  user!: any;
  products!: any;
  orderValue!: number;
  orderObject=Object();
  constructor(private orderService: OrderService, private cartService: CartService) { }

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('cart') || '[]');
    this.user=JSON.parse(localStorage.getItem('user') || '').id;
    this.products.foreach( (val: any) => {
          this.orderValue += val.price * val.qty;
        });
    this.orderValue=parseFloat( this.orderValue.toFixed(2));
  }
  placeOrder(){
    this.products.forEach((element: any) => {
      this.orderObject[element.id]=element.qty
    });
    console.log('oder obj', this.orderObject);
    // this.orderService.postOrder({
    //   "orderDate": "2021-03-08T14:27:24.878Z",
    //   "orderValue": this.orderValue,
    //   "orderedProducts": {
    //     "additionalProp1": 0,
    //     "additionalProp2": 0,
    //     "additionalProp3": 0
    //   },
    //   "userId": this.user
    // })
  }

}
