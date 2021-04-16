import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartComponent } from './cart.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { RatingModule } from 'ng-starrating';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cart: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatIconModule, RatingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })],
      declarations: [CartComponent, NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // component.cart=
    // {
    //   "userId": "606d80af5d5c555fe62bd7aa",
    //   "products": {
    //     '6040d6ba1e240556a8b76e8f': 1,
    //     '6040d6ba1e240556a8b76ea4': 1
    //   },
    //   "id": "60757137a6cf6e573c07dc23"
    // };

    component.cart.products=
    {
      '6040d6ba1e240556a8b76e8f': 1,
      '6040d6ba1e240556a8b76ea4': 1
    }
    
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

  it('should increase the number items in cart when + is clicked', () => {
    component.modifyQuantity('6040d6ba1e240556a8b76e8f', 1);
    expect(component.products[0].qty).toBe(2);
  });

  it('should decreases the number of itemes in cart when - is clicked', () => {
    spyOn(component, 'modifyQuantity').and.callThrough();
    component.modifyQuantity('6040d6ba1e240556a8b76e8f', -1);
    expect(component.products[0].qty).toBe(1);
  });

  it('should call modifyQuantity with correct args', () => {
    spyOn(component, 'modifyQuantity').and.callThrough();
    component.modifyQuantity('6040d6ba1e240556a8b76ea4', 2);
    expect(component.modifyQuantity).toHaveBeenCalledWith('6040d6ba1e240556a8b76ea4', 2);
  });

  it('should compute cart total', () => {
    component.computeTotal();
    expect(component.total).toBe(16343.9);
  });

});
