import { SearchService } from './../../../services/search.service';
import { ProductService } from './../../../services/product.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    private productServ: ProductService,
    private searchService: SearchService
  ) {}

  products: any;
  filtred: any;
  searchTerm = '';

  ngOnInit() {
    this.productServ.getProducts().subscribe((products) => {
      this.products = products;
      this.products.forEach((element:any) => element.qty=1);
      this.filtred = this.products;
    });
    this.searchService.currentSearchTerm.subscribe((term) => {
      this.searchTerm = term;
      this.filtred = this.products;
      if (this.filtred) {
        this.filtred = this.products.filter((val: any) =>
          val.name.toLowerCase().includes(this.searchTerm.toLowerCase().trim())
        );
      }
    });
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
}
