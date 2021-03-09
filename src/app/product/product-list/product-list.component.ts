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
  ) { }

  products: any[] = [];
  multiplePages: number[] = [];
  subscription!: Subscription;
  searchTerm = '';
  pageNumber = 0;
  totalPages = 0;
  numberOfMultiplePages = 5;
  pageSize = 10;
  pageSizeSelector = [10, 20, 50];

  callForProducts(): void {
    this.productServ.getProducts(this.pageNumber, this.pageSize).subscribe((products) => {
      this.products = products.content;
      this.totalPages = products.totalPages;
      this.showMultiplePages(this.multiplePages, this.pageNumber);
    });
    this.scroll.scrollToPosition([0, 0]);
  }

  showFirstPage(): void {
    this.pageNumber = 0;
    this.callForProducts();
  }

  decreasePageNo(): void {
    this.pageNumber--;
    this.callForProducts();
    console.log(this.pageNumber)
  }

  showPageNo(pageNo: number): void {
    this.pageNumber = pageNo;
    this.callForProducts();
  }

  increasePageNo(): void {
    this.pageNumber++;
    this.callForProducts();
    console.log(this.pageNumber);
  }

  showLastPage(): void {
    this.pageNumber = this.totalPages - 1;
    this.callForProducts();
  }

  selectPageSizeHandler(event: any): void {
    this.pageSize = event.target.value;
    this.pageNumber = 0;
    this.callForProducts();
  }

  showMultiplePages([], pageNo: number): void {

    let viewPages = this.totalPages - this.numberOfMultiplePages;

    this.multiplePages = [];

    if (this.totalPages < this.numberOfMultiplePages) {
      pageNo = 0;
      do {
        pageNo++
        this.multiplePages.push((pageNo));
      } while (pageNo != this.totalPages)
    }
    else if (pageNo - 1 < viewPages) {
      pageNo = (pageNo - Math.floor(this.numberOfMultiplePages / 2)) <= 0 ? 0
        : (pageNo <= this.numberOfMultiplePages) ? (pageNo - Math.floor(this.numberOfMultiplePages / 2))
          : pageNo;
      do {
        pageNo++
        this.multiplePages.push((pageNo));
      } while (this.multiplePages.length != this.numberOfMultiplePages &&
        ([...this.multiplePages].pop() != this.totalPages))
    }
    else {
      pageNo = this.totalPages - this.numberOfMultiplePages;
      do {
        pageNo++;
        this.multiplePages.push((pageNo));
      } while (this.multiplePages.length != this.numberOfMultiplePages);
    }
  }

  ngOnInit() {
    this.productServ.getProducts(this.pageNumber, this.pageSize).subscribe((products) => {
      this.products = products.content;
      this.totalPages = products.totalPages;
      this.showMultiplePages(this.multiplePages, this.pageNumber);
      this.scroll.scrollToPosition([0, 0]);
      console.log(products);
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
