import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
// import { Course } from '../course.model';
// import { CoursesService } from 'courses.service';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {CoursesService} from '../shared/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.css']
})
export class CoursesAddComponent implements OnInit, OnChanges {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private courseService: CoursesService) { }
  public course: Course;
  public courses: any;
  user;

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user)
    console.log(this.user);
    this.courseService.getAll(this.user).subscribe(responseData => {
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
    console.log(value.popis);
    this.course = new Course(value.nazov, value.cena, value.popis);
    this.courseService.createCourse(this.course, this.user)
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
