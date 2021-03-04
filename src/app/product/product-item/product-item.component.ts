import { Component, OnInit, Input } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  constructor() {}
  @Input() product: any;
  rating = 3;

  ngOnInit() {}
}
