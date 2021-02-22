import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { FormControl , Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products!: any[];
  total=0;
  selected = 'option1';
  constructor() { }

  ngOnInit(): void {
    this.products=[{ name: "produs1", id: 123, image:'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 20, qty: 1, rating: 3, },
    { name: "produs1", id: 256, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 21, qty:2, rating: 4 },
    { name: "produs1", id: 789, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 22, qty:2, rating: 3.5 },
    { name: "produs1", id: 56564, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 23, qty:2, rating: 5 },
    { name: "produs1", id: 25566, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 25, qty:2, rating: 3},
    { name: "produs1", id: 3459, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 26, qty:2, rating: 3 },
    { name: "produs1", id: 25656, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 27, qty:2, rating: 3 },
    { name: "produs1", id: 354, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 28, qty:2, rating: 3 },
  ];
    this.computeTotal();
  }
  deleteFromCart(id: any){
    this.products=this.products.filter((product)=> (product.id!==id));
    this.computeTotal();
  }
  modifyQuantity(id: number, diff: number){
    this.products.forEach((val)=> {if(val.id===id) val.qty=val.qty+diff;});
    this.computeTotal();
  }
  computeTotal(){
    this.total=0;
    this.products.forEach((val:any)=>{this.total+=(val.price*val.qty); console.log("price: ", val.price, "qty: ", val.qty);});
    console.log("total:", this.total);
  }
  onRate($event:{oldValue:number, newValue:number, starRating:any}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

}
