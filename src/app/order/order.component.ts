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
  orderDate!: any;
  constructor(private orderService: OrderService, private cartService: CartService) { }

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('cart') || '[]');
    this.user=JSON.parse(localStorage.getItem('user') || '').id;
    this.products.foreach( (val: any) => {
          this.orderValue += val.price * val.qty;
        });
    this.orderValue=parseFloat( this.orderValue.toFixed(2));
    this.products.forEach((element: any) => {
      this.orderObject[element.id]=element.qty
    });
    console.log('oder obj', this.orderObject);
    var d = new Date();
    console.log('date: ', this.orderDate);
    this.orderDate = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+(((d.getMinutes()/5)*5).toString().length==2?((d.getMinutes()/5)*5).toString():"0"+((d.getMinutes()/5)*5).toString())+":00";
    console.log('date: ', this.orderDate);


  }
  placeOrder(){
    this.products.forEach((element: any) => {
      this.orderObject[element.id]=element.qty
    });
    console.log('oder obj', this.orderObject);
    this.orderService.postOrder({
      "orderDate": "2021-03-08T14:27:24.878Z",
      "orderValue": this.orderValue,
      "orderedProducts": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "userId": this.user
    })
  }

}
