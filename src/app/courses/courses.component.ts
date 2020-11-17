import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
// import { Course } from '../course.model';
// import { CoursesService } from 'courses.service';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnChanges {

  constructor(private http: HttpClient, private router: Router) { }
  public course: Course;
  // tslint:disable-next-line:ban-types
  public courses: any;

  ngOnInit() {
    this.http
      .get(
        'http://localhost:8081/courses'
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
