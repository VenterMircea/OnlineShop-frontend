import { FilterProductPipe } from './../../pipes/filter-product.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductListComponent } from './product-list.component';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatIconModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })],
      declarations: [ProductListComponent, FilterProductPipe, NavbarComponent, ProductItemComponent],
    }).compileComponents();
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call for products', () => {
    spyOn(component, 'callForProducts').and.callThrough();
    component.callForProducts();
    expect(component.callForProducts).toHaveBeenCalled();
  });
  it('should return first page', () => {
    spyOn(component, 'showFirstPage').and.callThrough();
    spyOn(component, 'callForProducts');
    component.showFirstPage();
    expect(component.showFirstPage).toHaveBeenCalled();
    expect(component.callForProducts).toHaveBeenCalledTimes(1);
  });
  it('should decrease page number', () => {
    component.pageNumber = 2;
    spyOn(component, 'decreasePageNo').and.callThrough();
    spyOn(component, 'callForProducts');
    component.decreasePageNo();
    expect(component.decreasePageNo).toHaveBeenCalled();
    expect(component.callForProducts).toHaveBeenCalledTimes(1);
    expect(component.pageNumber).toEqual(1);
  });
  it('should show page number', () => {
    component.pageNumber = 2;
    spyOn(component, 'showPageNo').and.callThrough();
    spyOn(component, 'callForProducts');
    component.showPageNo(3);
    expect(component.showPageNo).toHaveBeenCalled();
    expect(component.callForProducts).toHaveBeenCalledTimes(1);
    expect(component.pageNumber).toEqual(3);
  });
  it('should increase page number', () => {
    component.pageNumber = 0;
    spyOn(component, 'increasePageNo').and.callThrough();
    spyOn(component, 'callForProducts');
    component.increasePageNo();
    expect(component.increasePageNo).toHaveBeenCalled();
    expect(component.callForProducts).toHaveBeenCalledTimes(1);
    expect(component.pageNumber).toEqual(1);
  });
  it('should return last page', () => {
    component.totalPages = 11;
    spyOn(component, 'showLastPage').and.callThrough();
    spyOn(component, 'callForProducts');
    component.showLastPage();
    expect(component.showLastPage).toHaveBeenCalled();
    expect(component.callForProducts).toHaveBeenCalledTimes(1);
    expect(component.pageNumber).toEqual(10);
  });
  it('should return page size', () => {
    spyOn(component, 'selectPageSizeHandler').and.callThrough;
    component.selectPageSizeHandler(20);
    expect(component.selectPageSizeHandler).toHaveBeenCalledWith(20);
  });
  it('should return multiple pages view', () => {
    spyOn(component, 'showMultiplePages').and.callThrough;
    component.showMultiplePages(6);
    expect(component.showMultiplePages).toHaveBeenCalledWith(6);
  });
});
