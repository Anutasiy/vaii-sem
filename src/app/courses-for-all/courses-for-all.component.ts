import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {CoursesService} from '../shared/services/courses.service';

@Component({
  selector: 'app-courses-for-all',
  templateUrl: './courses-for-all.component.html',
  styleUrls: ['./courses-for-all.component.css']
})
export class CoursesForAllComponent implements OnInit, OnChanges {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private courseService: CoursesService) { }
  public course: Course;
  public courses: any;
  user;

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
    console.log(this.user);
    this.courseService.getAll(this.user).subscribe(responseData => {
      this.courses = responseData;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }
}

export class Course {
  constructor(
    public nazov: string,
    public cena: number,
    public popis: string
  ) {}
}

