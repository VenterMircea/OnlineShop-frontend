import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let accountService: AccountService;
  let user: User;
  let userServerCompleteResponse: Response;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AccountService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    accountService = new AccountService(httpClientSpy as any);
    user = {
      firstName: 'Julie',
      lastName: 'Anderson',
      email: 'judy@judy.com',
      username: 'judy',
      telephone: '754545778',
      sex: 'F',
      password: '$2a$10$/cXsj4MNvG8UQUDMTPT/ie1tlT67.9mkm6OF4ropL2DjZF5LtXR1m',
      addressEntity: {
        address: 'Strada cetatii nr 2',
        city: 'Bucuresti',
        county: 'Bucuresti',
        postalCode: '73452699',
      },
      id: '60491531f8cb6a1bb44c6c9a',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('login() should return an observable', () => {
    expect(service.login('adenis', 'test')).toBeInstanceOf(Observable);
  });

  it('getAll() should return all users by making one get request', () => {
    let users = [user];
    httpClientSpy.get.and.returnValue(of(users));
    accountService
      .getAll()
      .subscribe((response) => expect(response).toBe(users));
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('getById() should return one user by making one get request', () => {
    httpClientSpy.get.and.returnValue(of(user));
    accountService
      .getById('12345')
      .subscribe((response) => expect(response).toBe(user));
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('userUpdate() should post modified user and return user by making one post request', () => {
    httpClientSpy.put.and.returnValue(of(user));
    accountService
      .userUpdate('id', user)
      .subscribe((response) => expect(response).toBe(user));
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });
});
