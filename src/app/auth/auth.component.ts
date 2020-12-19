import {Component, Injectable, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { User} from './user.model';
import {Course} from '../courses-add/courses-add.component';
import { catchError, tap } from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import { AuthService, AuthResponseData } from '../shared/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

// @Injectable({providedIn: 'root'})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  // user = new Subject<UserModel>();
//  user = new BehaviorSubject<UserModel>(null);

  constructor(private authService: AuthService, private router: Router) {}

  // public auth: Auth;
  // // tslint:disable-next-line:ban-types
  // public auths: any;

  // ngOnInit() {
  //   // this.http
  //     // .get(
  //     //   'http://localhost:8081/auth'
  //     // )
  //     // .subscribe(responseData => {
  //     //   this.auths = responseData;
  //     // });
  // }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    const surname = form.value.surname;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.onCreateUser(email, password, name, surname);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
  //
  // onCreateUser(form: NgForm) {
  //   const value = form.value;
  //   console.log(value.name);
  //   console.log(value.surname);
  //   console.log(value.email);
  //   console.log(value.password);
  //   this.auth = new Auth( value.email, value.password, 'user', value.name, value.surname);
  //   console.log(this.auth);
  //   this.isLoading = true;
  //   this.http
  //     .post<AuthResponseData>(
  //       'http://localhost:8081/api/auth/register',
  //       this.auth
  //     )
  //     .pipe(
  //       tap(responseData => {
  //         console.log(responseData);
  //         this.handleAutentification(
  //           responseData.email,
  //           responseData.userId,
  //           responseData.token,
  //           +responseData.expiresIn,
  //           responseData.role
  //         );
  //       })
  //     )
  //     .subscribe(responseData => {
  //       console.log(responseData);
  //       this.isLoading = false;
  //       this.error = null;
  //       this.router.navigate(['']);
  //       // this.router.navigate(['/auth']);
  //     },
  //     error => {
  //       console.log(error);
  //       this.error = 'An error occured!Pouzivatel s danym Emailom uz existuje!';
  //       this.isLoading = false;
  //     })
  //
  //   ;
  //
  //   form.reset();
  // }
  //
  //
  // login(form: NgForm) {
  //   const value = form.value;
  //   console.log(value.email);
  //   console.log(value.password);
  //   const headers = new HttpHeaders();
  //   headers.set('Content-Type', 'application/json; charset=utf-8');
  //   const body = JSON.stringify({email:  value.email,
  //     password:  value.password});
  //   this.http
  //     .post<AuthResponseData>(
  //       'http://localhost:8081/api/auth/login',
  //       body,
  //       {
  //         headers: new HttpHeaders(
  //           {
  //             'Content-Type': 'application/json'
  //           })
  //       }
  //     )
  //     .pipe(
  //       tap(responseData => {
  //         console.log(responseData);
  //         this.handleAutentification(
  //           responseData.email,
  //           responseData.userId,
  //           responseData.token,
  //           +responseData.expiresIn,
  //           responseData.role
  //         );
  //       })
  //     )
  //     .subscribe(
  //       responseData => {
  //         console.log(responseData);
  //         this.isLoading = false;
  //         this.error = null;
  //         this.router.navigate(['']);
  //         // this.router.navigate(['/auth']);
  //       },
  //       errorMessage => {
  //         console.log(errorMessage);
  //         this.error = errorMessage;
  //         this.isLoading = false;
  //       });
  // }

  logout() {
   // this.user.next(null);
   // this.router.navigate(['']);
    localStorage.clear();

  }

  // private handleAutentification(email: string, userId: string, token: string, expiresIn: number, role: string) {
  //   const expirationDate = new Date(
  //     new Date().getTime() + expiresIn * 1000
  //   );
  //   console.log(this.user);
  //   const user = new UserModel(
  //     email,
  //     userId,
  //     token,
  //     expirationDate,
  //     role
  //   );
  //   this.user.next(user);
  //   // console.log('som tu kde chcem');
  //   // console.log(this.user);
  //   // console.log('koncim');
  // }
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
// interface AuthResponseData {
//   message: string;
//   email?: string;
//   userId?: string;
//   token?: string;
//   role?: string;
//   expiresIn?: number;
//
// }
