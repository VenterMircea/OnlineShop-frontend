import { FilterProductPipe } from './../../pipes/filter-product.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from 'src/services/product.service';
import { SearchService } from 'src/services/search.service';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ProductListComponent, FilterProductPipe],
    }).compileComponents();
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
    // let pageNumber = 0,
    //   pageSize = 10,
    //   orderOptions = ['-', 'Price', 'Rating', 'Name', 'Brand'],
    //   descending = true,
    //   sortBy = '';

    // component = new ProductListComponent(
    //   ElementRef as any,
    //   ProductService as any,
    //   SearchService as any,
    //   ViewportScroller as any,
    //   ActivatedRoute as any
    // )
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
