import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHandler,
} from '@angular/common/http';
import { AppInterceptorInterceptor } from './app-interceptor.interceptor';
import { getUrlScheme } from '@angular/compiler';

describe('AppInterceptorInterceptor', () => {
  let httpTestingController: HttpTestingController,
    mockLoggerSvc: any,
    httpClient: HttpClient;

  beforeEach(() => {
    mockLoggerSvc = {
      info: jasmine.createSpy('info'),
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptorInterceptor,
          multi: true,
        },
        {
          provide: AppInterceptorInterceptor,
          useValue: mockLoggerSvc,
        },
        AppInterceptorInterceptor,
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    const interceptor: AppInterceptorInterceptor = TestBed.inject(
      AppInterceptorInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
  it('should log a message when an API is called and set the authorization header', () => {
    httpClient.get('http://localhost:4200/#/order').subscribe();
    const interceptor: AppInterceptorInterceptor = TestBed.inject(
      AppInterceptorInterceptor
    );

    let req = httpTestingController.expectOne('http://localhost:4200/#/order');

    req.flush([]);
    expect(req.request.url).toContain('/order');
    expect(req.request.headers.get('Authorization')).toBeDefined;
  });
});
