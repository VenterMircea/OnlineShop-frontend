import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../app/models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject!: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor( private http: HttpClient) {
    if (localStorage.hasOwnProperty('user'))
      this.userSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('user') || '{}')
      );
    else this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  login(username: any, password: any) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/login`,
        { username: username, password: password },
        { observe: 'response' as 'body' }
      )
      .pipe(
        map((user) => {
          let userM = user.body;
          userM.token = user.headers.get('Authorization');
          localStorage.setItem('user', JSON.stringify(userM));
          this.userSubject.next(user.body);
          console.log('complete response', user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next({
      id: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      token: '',
    });
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/findAll`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id: any, params: any) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params).pipe(
      map((x) => {
        if (id == this.userValue.id) {
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }
        return x;
      })
    );
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      })
    );
  }
  createUser(user: any) {
    return this.http.post('http://3.120.32.114:8080/users', user);
  }

  // publish updated user to subscribers
  userUpdate(id: any, updatedUser: any) {
    return this.http.put(`http://3.120.32.114:8080/users/${id}`, updatedUser);
  }

  confirmAccount(id: any){
    return this.http.put(`${environment.apiUrl}/userConfirmation?userId=${id}`, id);
  }
}
