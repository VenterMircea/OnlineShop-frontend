import { ProductService } from 'src/services/product.service';
import { SearchService } from './../services/search.service';
import { CartService } from './../services/cart.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'online-store';
}
