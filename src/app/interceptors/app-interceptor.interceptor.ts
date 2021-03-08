import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/login') || request.url.includes('/cart') || request.url.includes('/register') || request.url.includes(''))
    return next.handle(request);
    else {const token=JSON.parse(localStorage.getItem('user')||'').token;
    const req = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    })
    return next.handle(req);
  }
  } 
}
