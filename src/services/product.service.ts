import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts(pageNo: any, pageSize: any, sortBy: any, sortDirection: any) {
    //return this.http.get<any>('../assets/products.json');
    if(sortBy!='' && sortBy!='-')
      return this.http.get<any>(
        `http://3.120.32.114:8080/products/findAll?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`
      );
    else 
      return this.http.get<any>(
        `http://3.120.32.114:8080/products/findAll?pageNo=${pageNo}&pageSize=${pageSize}`
      );
  }
  getProduct(id: any) {
    return this.http.get<any>(`http://3.120.32.114:8080/products/${id}`);
  }
  getPageSize(size: any) {
    return this.http.get<any>(`http://3.120.32.114:8080/products/${size}`);
  }
}
