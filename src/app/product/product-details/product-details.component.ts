import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productServ: ProductService
  ) {}
  products!: any[];
  product: any;

  ngOnInit() {
    this.productServ.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
      const id = this.route.snapshot.params.id;
      const ind = this.products.findIndex((x) => x.id == id);
      console.log(ind);
      this.product = this.products[ind];
    });
  }
}
