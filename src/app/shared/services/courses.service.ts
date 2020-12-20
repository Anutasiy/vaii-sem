import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../auth/user.model';
import {Course} from '../../courses-add/courses-add.component';



@Injectable({providedIn: 'root'})
export class CoursesService {

  constructor(private http: HttpClient, private router: Router) { }
   user;

  deleteById(id: bigint, user: User) {
    return this.http.delete('http://localhost:8081/courses/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)});
  }

  getAll(user: User) {
    if (user != null) {
      return this.http.get('http://localhost:8081/courses'
        , {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)}
      );
    } else {
      return this.http.get('http://localhost:8081/courses'
      );
    }
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

