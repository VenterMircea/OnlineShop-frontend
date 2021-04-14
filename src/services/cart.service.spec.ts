/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from './cart.service';

describe('Service: Cart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
  });

  it('should ...', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));
  it('should update cart', inject([CartService], (service: CartService) => {
    spyOn(service, 'getCart').and.callThrough;
    service.getCart();
    expect(service.update).toHaveBeenCalled();
  }));
});
