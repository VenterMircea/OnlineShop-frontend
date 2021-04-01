import { HttpClientTestingModule } from '@angular/common/http/testing';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from 'src/services/account.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shuould submit request', () => {
    const accountService = fixture.debugElement.injector.get(AccountService);
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  })

  it('should not login', () => {
    const accountService = fixture.debugElement.injector.get(AccountService);
    component.errorFromServer = true;
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    expect(component.onSubmit).toThrowError();
  })

  it('should submit password and user through account service', () => {
    const accountService = fixture.debugElement.injector.get(AccountService);
    spyOn(accountService, 'login').and.callThrough();
    component.accountService.login("jade", "Test1234?");
    expect(component.accountService.login).toHaveBeenCalledWith("jade", "Test1234?");
  });

  it('should through error because password pattern do not match', () => {
    const accountService = fixture.debugElement.injector.get(AccountService);
    spyOn(accountService, 'login').and.callThrough();
    component.accountService.login("jade", "Test1234");
    expect(component.accountService.userValue).toEqual(null);
  });

});
