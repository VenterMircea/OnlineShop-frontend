import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) { }

  postOrder(order: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/orders`, order);
  }

  getOrderByUserId(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/orders/user/${id}`);
  }
  getPaypalLogin(link: string): Observable<any> {
    return this.http.get(link);
  }

  postPayPal(pay: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/payments/pay`, pay);
  }
}
