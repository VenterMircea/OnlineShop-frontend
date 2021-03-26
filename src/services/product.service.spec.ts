/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('Service: Product', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
  }));

  {
    it('should ...', inject([ProductService], (service: ProductService) => {
      expect(service).toBeTruthy();
    }));
  }

  it('should get products', inject(
    [ProductService],
    (service: ProductService) => {
      spyOn(service, 'getProducts').and.callThrough();
      service.getProducts(0, 10, '', '');
      expect(service.getProducts).toHaveBeenCalled();
      expect(service.getProducts).toHaveBeenCalledWith(0, 10, '', '');
    }
  ));
  it('should get product', inject(
    [ProductService],
    (service: ProductService) => {
      spyOn(service, 'getProduct').and.callThrough();
      service.getProduct(100);
      expect(service.getProduct).toHaveBeenCalled();
      expect(service.getProduct).toHaveBeenCalledWith(100);
    }
  ));
  it('should get page size', inject(
    [ProductService],
    (service: ProductService) => {
      spyOn(service, 'getPageSize').and.callThrough();
      service.getPageSize(20);
      expect(service.getPageSize).toHaveBeenCalled();
      expect(service.getPageSize).toHaveBeenCalledWith(20);
    }
  ));
});
