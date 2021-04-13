import { OrderService } from './../../../services/order.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  userID = '';
  myOrders!: any;
  @Output() sectionEvent = new EventEmitter();

  constructor(private orderService: OrderService) {}

  sendSectionChange(order: any) {
    this.sectionEvent.emit(order);
  }

  ngOnInit(): void {
    this.userID = JSON.parse(localStorage.getItem('user') || '{}').id;
    this.orderService.getOrderByUserId(this.userID).subscribe((order) => {
      this.myOrders = order.reverse();
    });
  }
}
