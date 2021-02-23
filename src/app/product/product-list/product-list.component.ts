import { ProductService } from './../../../services/product.service';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    private productServ: ProductService
  ) {}

  products: any;

  ngOnInit() {
    this.productServ
      .getProducts()
      .subscribe((products) => (this.products = products));
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
}
