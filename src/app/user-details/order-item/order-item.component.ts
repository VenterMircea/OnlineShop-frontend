import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order: any;
  @Output() sectionEvent = new EventEmitter()
  constructor() { }

  changeSection3(){
    this.sectionEvent.emit(3);
  }

  ngOnInit(): void {
    console.log('oder in child or:', this.order);
  }

}
