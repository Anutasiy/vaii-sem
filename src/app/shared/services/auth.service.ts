import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {throwError, Subject, BehaviorSubject, pipe} from 'rxjs';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
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

  // isLoginMode = true;
  // isLoading = false;
  // error: string = null;
  // user = new Subject<UserModel>();
  user = new BehaviorSubject<User>(null);
  // private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }


  onCreateUser(email: string, password: string, name: string, surname: string ) {
  return this.http
      .post<AuthResponseData>(
        'http://localhost:8081/api/auth/register',
        {
          email,
          password,
          role: 'user',
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
      // .subscribe(responseData => {
      //     console.log(responseData);
      //     this.isLoading = false;
      //     this.error = null;
      //     this.router.navigate(['']);
      //     // this.router.navigate(['/auth']);
      //   },
      //   error => {
      //     console.log(error);
      //     this.error = 'An error occured!Pouzivatel s danym Emailom uz existuje!';
      //     this.isLoading = false;
      //   })
   // form.reset();
  }


  login(email: string, password: string) {
    // const value = form.value;
    // console.log(value.email);
    // console.log(value.password);
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json; charset=utf-8');

    // const body = JSON.stringify({email,
    //   password});
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
      // const expirationDuration =
      //   new Date(userData.ExpirationDate).getTime() -
      //   new Date().getTime();
      // this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('userData');

  }

  // autoLogout(expirationDuration: number) {
  //   this.tokenExpirationTimer = setTimeout(() => {
  //     this.logout();
  //   }, expirationDuration);
  // }

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
    // console.log('som tu kde chcem');
    // console.log(this.user);
    // console.log('koncim');
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXIST':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email doesnt exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}

// export class Auth {
//   constructor(
//     public email: string,
//     public password: string,
//     public role: string,
//     public name: string,
//     public surname: string,
//     registered?: boolean
//   ) {}
//
// }

