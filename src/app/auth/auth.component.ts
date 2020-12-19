import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Course} from '../courses-add/courses-add.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  public auth: Auth;
  // tslint:disable-next-line:ban-types
  public auths: any;

  ngOnInit() {
    // this.http
      // .get(
      //   'http://localhost:8081/auth'
      // )
      // .subscribe(responseData => {
      //   this.auths = responseData;
      // });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.reset();
  }

  onCreateUser(form: NgForm) {
    const value = form.value;
    console.log(value.name);
    console.log(value.surname);
    console.log(value.email);
    console.log(value.password);
    this.auth = new Auth( value.email, value.password, 'user', value.name, value.surname);
    console.log(this.auth);
    this.isLoading = true;
    this.http
      .post(
        'http://localhost:8081/api/auth/register',
        this.auth
      )
      .subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.error = null;
        // this.router.navigate(['/auth']);
      },
      error => {
        console.log(error);
        this.error = 'An error occured!Pouzivatel s danym Emailom uz existuje!';
        this.isLoading = false;
      }
      );

    form.reset();
  }


  login(form: NgForm) {
    const value = form.value;
    console.log(value.email);
    console.log(value.password);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    const body = JSON.stringify({email:  value.email,
      password:  value.password});
    this.http
      .post(
        'http://localhost:8081/api/auth/login',
        body,
        {
          headers: new HttpHeaders(
            {
              'Content-Type': 'application/json'
            })
        }
      )
      .subscribe(responseData => {
          console.log(responseData);
          this.isLoading = false;
          this.error = null;
          // this.router.navigate(['/auth']);
        },
        error => {
          console.log(error);
          this.error = 'An error occured!Pouzivatel s danym Emailom neexistuje!';
          this.isLoading = false;
        });
  }
}

export class Auth {
  constructor(
    public email: string,
    public password: string,
    public role: string,
    public name: string,
    public surname: string,
    registered?: boolean
  ) {}

}
