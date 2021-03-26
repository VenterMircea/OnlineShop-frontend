import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(pageNo: any, pageSize: any, sortBy: any, sortDirection: any) {
    //return this.http.get<any>('../assets/products.json');
    if (sortBy != '' && sortBy != '-')
      return this.http.get<any>(
        `${environment.apiUrl}/products/findAll?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`
      );
    else
      return this.http.get<any>(
        `${environment.apiUrl}/products/findAll?pageNo=${pageNo}&pageSize=${pageSize}`
      );
  }
  getProduct(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/products/${id}`);
  }
  getPageSize(size: any) {
    return this.http.get<any>(`${environment.apiUrl}/products/${size}`);
  }
}
