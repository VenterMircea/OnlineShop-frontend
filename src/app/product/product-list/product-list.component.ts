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
import { ActivatedRoute } from '@angular/router';

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
    private scroll: ViewportScroller,
    private route: ActivatedRoute
  ) {}

  products: any[] = [];
  subscription!: Subscription;
  searchTerm = '';
  pageNumber = 0;
  totalPages = 0;
  pageSize = 10;

  firstPage() {
    this.pageNumber = 0;
    this.productServ
      .getProducts(this.pageNumber, this.pageSize)
      .subscribe((products) => {
        this.products = products.content;
        this.totalPages = products.totalPages;
      });
    this.scroll.scrollToPosition([0, 0]);
  }

  decreasePageNo() {
    this.pageNumber--;
    this.productServ
      .getProducts(this.pageNumber, this.pageSize)
      .subscribe((products) => {
        this.products = products.content;
        this.totalPages = products.totalPages;
      });
    this.scroll.scrollToPosition([0, 0]);
  }

  increasePageNo() {
    this.pageNumber++;
    this.productServ
      .getProducts(this.pageNumber, this.pageSize)
      .subscribe((products) => {
        this.products = products.content;
        this.totalPages = products.totalPages;
      });
    console.log(this.pageNumber, this.totalPages);
    this.scroll.scrollToPosition([0, 0]);
  }
  lastPage() {
    this.pageNumber = this.totalPages - 1;
    this.productServ
      .getProducts(this.pageNumber, this.pageSize)
      .subscribe((products) => {
        this.products = products.content;
        this.totalPages = products.totalPages;
      });
    console.log(this.pageNumber, this.totalPages);
    this.scroll.scrollToPosition([0, 0]);
  }

  selectChangeHandler(event: any) {
    this.pageSize = event.target.value;
    this.pageNumber = 0;
    this.productServ
      .getProducts(this.pageNumber, this.pageSize)
      .subscribe((products) => {
        this.products = products.content;
        this.totalPages = products.totalPages;
        console.log(this.pageSize);
      });
    this.scroll.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this.productServ
      .getProducts(this.pageNumber, this.pageSize)
      .subscribe((products) => {
        this.products = products.content;
        this.totalPages = products.totalPages;
      });
    this.subscription = this.searchService.currentSearchTerm.subscribe(
      (term) => {
        this.searchTerm = term;
      }
    );
    console.log(this.route);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
