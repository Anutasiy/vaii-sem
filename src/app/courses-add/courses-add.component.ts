import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
// import { Course } from '../course.model';
// import { CoursesService } from 'courses.service';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.css']
})
export class CoursesAddComponent implements OnInit, OnChanges {

  constructor(private http: HttpClient) { }
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


  onCreateCourse(form: NgForm) {
    const value = form.value;
    console.log(value.nazov);
    console.log(value.cena);
    this.course = new Course(value.nazov, value.cena, 'popis');
    this.http
      .post(
        'http://localhost:8081/courses',
        this.course
      )
      .subscribe(responseData => {
        console.log(responseData);
        this.ngOnInit();
      });
  }

}

export class Course {
  constructor(
    public nazov: string,
    public cena: number,
    public popis: string
  ) {}
}
