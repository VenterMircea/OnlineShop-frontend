import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let order: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OrderService);
    order = {
      orderedProducts: {
        '6040d6ba1e240556a8b76e98': 4,
      },
      orderDate: '2021-03-22T10:48:29.428',
      orderValue: 8312,
      userId: '603648273ed85832b440eb9b',
      id: '605875fd26469c2991aaf0da',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post order', inject(
    [OrderService],
    (service: OrderService) => {
      spyOn(service, 'postOrder').and.callThrough;
      service.postOrder(order);
      expect(service.postOrder).toHaveBeenCalled();
    }
  ));
});
