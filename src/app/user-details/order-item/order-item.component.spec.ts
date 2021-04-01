import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderService } from 'src/services/order.service';

import { OrderItemComponent } from './order-item.component';

describe('OrderItemComponent', () => {
  let component: OrderItemComponent;
  let fixture: ComponentFixture<OrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [OrderItemComponent]
    })
      .compileComponents();
    const service = TestBed.inject(OrderService);
    const order = {
      orderedProducts: {
        '6040d6ba1e240556a8b76e98': 4,
      },
      orderDate: '2021-04-01T10:48:29.428',
      orderValue: 8312,
      userId: '603648273ed85832b440eb9b',
      id: '605875fd26469c2991aaf0da',
    };

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   //  expect(component).toBeTruthy();
  // });
});
