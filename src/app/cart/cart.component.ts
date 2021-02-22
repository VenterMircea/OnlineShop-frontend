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
  countVal=5;
  selected = 'option1';
  constructor() { }

  ngOnInit(): void {
    this.products=[{ name: "produs1", id: 123, image:'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 20, qty: 1 },
    { name: "produs1", id: 256, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 25, qty:2 },
    { name: "produs1", id: 256, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 25, qty:2 },
    { name: "produs1", id: 256, image: 'https://www.babyliss-romania.ro/assets/files/products/2208/fdb_1613051038_c453e_001.png', stock: 4, description: 'blaaaa blaaa', price: 25, qty:2 },];
  }
  ngAfterViewInit(): void{
    console.log(document.getElementById(`quantity${this.products[0].id}`))
    var e=document.getElementById(`quantity${this.products[0].id}`);
    //var result = e.options[e.selectedIndex].value;
    this.GetSelectedValue()
  }
  GetSelectedValue(){
    // var e = document.getElementById("cars");
    // console.log("called: ",e?.value);
    // var result = e.options[e.selectedIndex].value;
    
    // document.getElementById("result").innerHTML = result;
}

}
