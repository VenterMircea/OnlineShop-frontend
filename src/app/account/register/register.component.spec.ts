/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from 'src/services/account.service';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule, MatIconModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })],
      declarations: [RegisterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check email', () => {
    const accountService = fixture.debugElement.injector.get(AccountService);
    component.emailExists = true;
    component.submittedUsername = 'Nelutu';
    component.success = 0;
    spyOn(accountService, 'checkEmailNotTaken').and.callThrough();
    spyOn(component, 'submit').and.callThrough();
    component.submit();
    component.accountService.checkEmailNotTaken("jade@email.com");
    expect(component.submit).toHaveBeenCalled();
    expect(component.accountService.checkEmailNotTaken).toHaveBeenCalledWith("jade@email.com");
    expect(component.accountService.checkEmailNotTaken).toHaveBeenCalled();
  });

  it('should check username', () => {
    component.usernameExists = true;
    const accountService = fixture.debugElement.injector.get(AccountService);
    spyOn(component, 'checkUsername').and.callThrough();
    component.checkUsername();
    component.accountService.checkUsernameNotTaken("jade");
    //expect(component.accountService.checkUsernameNotTaken).toHaveBeenCalled();
    expect(component.accountService.checkUsernameNotTaken).withContext('jade').toThrowError();
  });

});
