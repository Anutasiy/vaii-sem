import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
// import { Course } from '../course.model';
// import { CoursesService } from 'courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses-update.component.html',
  styleUrls: ['./courses-update.component.css']
})
export class CoursesUpdateComponent implements OnInit, OnChanges {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }
  public course: Course;
  // tslint:disable-next-line:ban-types
  public courses: any;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.http
      .get(
        'http://localhost:8081/courses/' + id
      )
      .subscribe(responseData => {
        console.log(responseData)
        this.courses = responseData;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }


  onUpdateCourse(form: NgForm) {
    // const value = form.value;
    // console.log(value.nazov);
    // console.log(value.cena);
    // console.log(value.popis);
    // this.course = new Course(value.nazov, value.cena, value.popis);
    this.http
      .put(
        'http://localhost:8081/courses',
        this.courses
      )
      .subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(['/courses']);
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
