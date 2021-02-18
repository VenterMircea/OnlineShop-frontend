import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products!: Product[];
  constructor() { }

  ngOnInit(): void {
    this.products=[{ name: "produs1", id: 123, image:'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 20 },
    { name: "produs1", id: 123, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 25 }];
  }
}
