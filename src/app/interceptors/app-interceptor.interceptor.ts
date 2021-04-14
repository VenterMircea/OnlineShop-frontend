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
  constructor() { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes('/orders') ||
      request.url.includes('/payments') ||
      request.url.includes('/users') ||
      request.url.includes('/carts')
    ) {
      const token = JSON.parse(localStorage.getItem('user') || '{}').token;
      const req = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
