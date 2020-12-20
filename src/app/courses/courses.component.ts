import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { CoursesService } from '../shared/services/courses.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnChanges {

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

  onDeleteCourse(id) {
    this.courseService.deleteById(id, this.user).subscribe(responseData => {
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
