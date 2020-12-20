import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../shared/services/auth.service';
import {CoursesService} from '../shared/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses-update.component.html',
  styleUrls: ['./courses-update.component.css']
})
export class CoursesUpdateComponent implements OnInit, OnChanges {

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private courseService: CoursesService
  ) { }

  public course: Course;
  public courses: any;
  user;

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
    const id = this.activatedRoute.snapshot.params.id;
    this.courseService.getById(id, this.user)
      .subscribe(responseData => {
        console.log(responseData);
        this.courses = responseData;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }

  onUpdateCourse(form: NgForm) {
    this.courseService.updateCourse(this.courses, this.user)
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
