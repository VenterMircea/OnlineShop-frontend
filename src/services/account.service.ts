import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../app/models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject!: BehaviorSubject<any>;
  public user: Observable<any>;
  private aux!: User;

  constructor(private router: Router, private http: HttpClient) {
    if (localStorage.getItem('user'))
      this.userSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('user') || '')
      );
    else this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

    login(username: any, password: any) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { "username":username, "password": password }, {observe: 'response' as 'body'})
            .pipe(map(user => {
                let userM=user.body;
                userM.token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2MDM2NDgyNzNlZDg1ODMyYjQ0MGViOTksbHJvemllcjIiLCJpc3MiOiJldS5hY2Nlc2Eub25saW5lc3RvcmUiLCJpYXQiOjE2MTUxOTgzMDgsImV4cCI6MTYxNTgwMzEwOH0.QjX0FhOV-H0MlbnOuy0FIuL4NOAmILKUttzQ2j1v06q4qFIB9dp-evtdZOqFkW5vBIdmud65mrEjm-TdKmLxhg';
                localStorage.setItem('user', JSON.stringify(userM));
                this.userSubject.next(user.body);
                return user;
            }));
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
        })
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

    update(id:any, params:any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                if (id == this.userValue.id) {
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}