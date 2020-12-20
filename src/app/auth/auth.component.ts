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



  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      const name = form.value.name;
      const surname = form.value.surname;
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

  onHandleError() {
    this.error = null;
  }
}


