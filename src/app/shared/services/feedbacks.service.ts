import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../auth/user.model';
import {Feedback} from '../../feedbacks/feedbacks.component';

@Injectable({providedIn: 'root'})
export class FeedbacksService {

  constructor(private http: HttpClient, private router: Router) {}

  user;

  deleteById(id: bigint, user: User) {
    return this.http.delete('http://localhost:8081/feedbacks/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)});
  }

  getAll(user: User) {
    if (user != null) {
      return this.http.get('http://localhost:8081/feedbacks'
        , {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)}
      );
    } else {
      return this.http.get('http://localhost:8081/feedbacks'
      );
    }

  }

  getById(id: bigint, user: User) {
    return this.http.get('http://localhost:8081/feedbacks/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)}
    );
  }

  createFeedback(newFeedback: Feedback, user: User) {
    return this.http.post('http://localhost:8081/feedbacks', newFeedback, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.myToken)});
  }
}
