import { Subscription } from 'rxjs';
import { SearchService } from './../../../services/search.service';
import { ProductService } from './../../../services/product.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  subscription!: Subscription;
  constructor(
    private elementRef: ElementRef,
    private productServ: ProductService,
    private searchService: SearchService
  ) {}

  products: any;
  searchValue = '';

  ngOnInit() {
    this.productServ
      .getProducts()
      .subscribe((products) => (this.products = products));
    this.subscription = this.searchService.currentSearch.subscribe((val) => {
      if (this.products) {
        this.products = this.products.filter((prod: any) =>
          prod.name.toUpperCase().includes(val.toUpperCase())
        );
      }
    });
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
}
