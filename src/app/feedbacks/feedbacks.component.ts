import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {FeedbacksService} from '../shared/services/feedbacks.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit, OnChanges {

  constructor(
    private http: HttpClient, private router: Router, private authService: AuthService, private feedbacksService: FeedbacksService) { }
  public feedback: Feedback;
  public feedbacks: any;
  user;

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
    console.log(this.user);
    this.feedbacksService.getAll(this.user).subscribe(responseData => {
      this.feedbacks = responseData;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }

  onDeleteFeedback(id) {
    this.feedbacksService.deleteById(id, this.user).subscribe(responseData => {
      console.log(responseData);
      this.ngOnInit();
    });
  }

}

export class Feedback {
  constructor(
    public nazov: string,
    public popis: string
  ) {}
}
