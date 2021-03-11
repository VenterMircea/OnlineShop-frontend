import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSource = new BehaviorSubject(
    JSON.parse(localStorage.getItem('cart') || '[]')
  );
  currentCart = this.cartSource.asObservable();
  constructor() {}
  update() {
    this.cartSource.next(JSON.parse(localStorage.getItem('cart') || '[]'));
  }
}
