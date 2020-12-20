import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {throwError, Subject, BehaviorSubject, pipe} from 'rxjs';
import { Router } from '@angular/router';
import {User} from '../../auth/user.model';

export interface AuthResponseData {
  message: string;
  email: string;
  userId?: string;
  token: string;
  role?: string;
  expiresIn?: number;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  onCreateUser(email: string, password: string, name: string, surname: string ) {
  return this.http
      .post<AuthResponseData>(
        'http://localhost:8081/api/auth/register',
        {
          email,
          password,
          role: 'USER',
          name,
          surname,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
        //  console.log(responseData);
          this.handleAutentification(
            responseData.email,
            responseData.userId,
            responseData.token,
            +responseData.expiresIn,
            responseData.role
          );
        })
      );
  }


  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:8081/api/auth/login',
        {
          email,
          password,
          headers: new HttpHeaders(
            {
              'Content-Type': 'application/json'
            })
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          //  console.log(responseData);
          this.handleAutentification(
            responseData.email,
            responseData.userId,
            responseData.token,
            +responseData.expiresIn,
            responseData.role
          );
        })
        );
  }

  autoLogin() {
    const userData: {
      email: string;
      userId: string;
      token: string;
      ExpirationDate: string;
      role: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.userId,
      userData.token,
      new Date(userData.ExpirationDate),
      userData.role
    );

    if (loadedUser.myToken) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('userData');

  }

  private handleAutentification(email: string, userId: string, token: string, expiresIn: number, role: string) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    console.log(this.user);
    const user = new User(
      email,
      userId,
      token,
      expirationDate,
      role
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    console.log(errorRes.error.status);
    switch (errorRes.error.status) {
      case 401:
        errorMessage = 'Meno alebo heslo nie je spravne';
        break;
      case 403:
        errorMessage = 'Nemate dostatocne prava';
        break;
    }
    return throwError(errorMessage);
  }
}



