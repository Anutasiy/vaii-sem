import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from '../auth/user.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnChanges {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  public course: Course;
  public courses: any;
  user;
  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user)
    console.log(this.user);
    this.http
      .get(
        'http://localhost:8081/courses',
        {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.user.token)}
      )
      .subscribe(responseData => {
        this.courses = responseData;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }

  onDeleteCourse(id) {
    this.http
      .delete(
        'http://localhost:8081/courses/' + id
      )
      .subscribe(responseData => {
        console.log(responseData);
        this.ngOnInit();
      });
  }

  updateCourse(id) {
    this.router.navigate(['/coursesUpdate', id]);
  }
}

export class Course {
  constructor(
    public nazov: string,
    public cena: number,
    public popis: string
  ) {}
}
