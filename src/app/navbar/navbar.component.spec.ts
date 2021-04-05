/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { SearchService } from './../../services/search.service';
import { CartService } from './../../services/cart.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NavbarComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show user options if user is not logged in', () => {
    component.userOptions = true;
    spyOn(component, 'signout').and.callThrough();
    component.signout();
    expect(component.userOptions).toBeFalse();
  });

  it('should go to login section if user is not logged in', () => {
    component.userLogged = false;
    spyOn(component, 'goToLogin').and.callThrough();
    component.goToLogin();
    fixture.detectChanges();
    expect(component.goToLogin).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(
      ['/account/login'],
      Object({ state: jasmine.any(Object) })
    );
  });
});
