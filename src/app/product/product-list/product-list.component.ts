import { Subscription } from 'rxjs';
import { SearchService } from './../../../services/search.service';
import { ProductService } from './../../../services/product.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private elementRef: ElementRef,
    private productServ: ProductService,
    private searchService: SearchService,
    private scroll: ViewportScroller
  ) {}

  products: any[] = [];
  subscription!: Subscription;
  searchTerm = '';
  pageNumber = 0;
  totalPages = 0;

  decreasePageNo() {
    this.pageNumber--;
    this.productServ.getProducts(this.pageNumber).subscribe((products) => {
      this.products = products.content;
    });

    this.scroll.scrollToPosition([0, 0]);
  }
  increasePageNo() {
    this.pageNumber++;
    this.productServ.getProducts(this.pageNumber).subscribe((products) => {
      this.products = products.content;
    });
    console.log(this.pageNumber);
    this.scroll.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this.productServ.getProducts(this.pageNumber).subscribe((products) => {
      this.products = products.content;
      this.totalPages = products.totalPages;
      console.log(products);
    });
    this.subscription = this.searchService.currentSearchTerm.subscribe(
      (term) => {
        this.searchTerm = term;
      }
    );
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
