import {Component, Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { AuthService } from '../services/auth.service';

import {NgForm} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../../auth/user.model';
import {Course} from '../../courses-add/courses-add.component';



@Injectable({providedIn: 'root'})
export class CoursesService {

  constructor(private http: HttpClient, private router: Router) { }
  // public course: Course;
  // public courses: any;
   user;

  deleteById(id: bigint, user: User) {
    return this.http.delete('http://localhost:8081/courses/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)});
  }

  getAll(user: User) {
   return this.http.get('http://localhost:8081/courses'
     , {
     headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)}
     );
  }

  getById(id: bigint, user: User) {
    return this.http.get('http://localhost:8081/courses/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)}
    );
  }

  createCourse(newCourse: Course, user: User) {
    return this.http.post('http://localhost:8081/courses', newCourse, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)});
  }

  updateCourse(course: Course, user: User) {
    return this.http.put('http://localhost:8081/courses', course, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)});
  }
}

