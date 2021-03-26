import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cart: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.products = [
      {
        name: 'BICICLETĂ MTB E-ST 900 27,5 PLUS PORTOCALIU ROCKRIDER',
        description:
          'ea commodo reprehenderit ipsum culpa consectetur proident velit dolore nulla ipsum excepteur cillum excepteur laboris amet officia elit adipisicing ea Lorem consectetur quis cupidatat consequat',
        price: 8302,
        rating: 2.4,
        itemsInStock: 74,
        image:
          'https://images.immediate.co.uk/production/volatile/sites/21/2019/03/vitus-nucleus-29vr-01-1546950934590-28yoc1fsocuj-1549026859608-367lfw54uv0s-3dff6bf-e1564576707898.jpg?quality=90&resize=620,413',
        brand: 'BTWIN',
        id: '6040d6ba1e240556a8b76e8f',
        qty: 1,
      },
      {
        name:
          'BICICLETĂ MTB ROCKRIDER ST 500 24 GALBEN FLUO COPII 9-12 ANI BTWIN',
        description:
          'mollit aliqua proident et cupidatat amet magna nulla do elit irure amet pariatur ea deserunt aute officia et anim excepteur aliquip qui aliqua Lorem velit',
        price: 8041.9,
        rating: 3.8,
        itemsInStock: 30,
        image:
          'https://s14761.pcdn.co/wp-content/uploads/2021/01/MTB-Nukeproof-Giga-2021-First-Ride-Review-Launch-00002-1140x760.jpg',
        brand: 'BTWIN',
        id: '6040d6ba1e240556a8b76ea4',
        qty: 1,
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increses the number of itmes in cart when + is clicked', () => {
    component.modifyQuantity('6040d6ba1e240556a8b76e8f', 1);
    expect(component.products[0].qty).toBe(2);
  });

  it('should decreases the number of itmes in cart when - is clicked', () => {
    component.modifyQuantity('6040d6ba1e240556a8b76ea4', -1);
    expect(component.products[1].qty).toBe(0);
  });

  it('should compute cart total', () => {
    component.computeTotal();
    expect(component.total).toBe(16343.9);
  });

  it('should delete product from cart', () => {
    component.deleteFromCart('6040d6ba1e240556a8b76ea4');
    expect(component.products[1]).toBe(undefined);
  });
});
