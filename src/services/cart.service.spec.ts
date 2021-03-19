/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('Service: Cart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService]
    });
  });

  it('should ...', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));
  it('should update cart', inject([CartService], (service: CartService) => {
    spyOn(service, 'update').and.callThrough;
    service.update();
    expect(service.update).toHaveBeenCalled();
  }));
});
