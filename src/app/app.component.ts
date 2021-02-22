import { ProductItemComponent } from './product/product-item/product-item.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'online-store';
  cart = [1, 2, 3, 4, 5, 6, 7];
}
