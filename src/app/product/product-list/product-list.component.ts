import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  products = [
    { name: 'bike', price: 5, rating: 3.2 },
    { name: 'bike', price: 5, rating: 4 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
    { name: 'bike', price: 5, rating: 3.5 },
  ];

  ngOnInit() {}
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
}
