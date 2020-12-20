import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {FeedbacksService} from '../shared/services/feedbacks.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-feedbacks-add',
  templateUrl: './feedbacks-add.component.html',
  styleUrls: ['./feedbacks-add.component.css']
})
export class FeedbacksAddComponent implements OnInit, OnChanges {

  constructor(
    private http: HttpClient, private router: Router, private authService: AuthService, private feedbackService: FeedbacksService) { }
  public feedback: Feedback;
  public feedbacks: any;
  user;

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
    console.log(this.user);
    this.feedbackService.getAll(this.user).subscribe(responseData => {
      this.feedbacks = responseData;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }

  onCreateFeedback(form: NgForm) {
    const value = form.value;
    console.log(value.nazov);
    console.log(value.popis);
    this.feedback = new Feedback(value.nazov, value.popis);
    this.feedbackService.createFeedback(this.feedback, this.user)
      .subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(['/feedbacks']);
      });
  }
}

export class Feedback {
  constructor(
    public nazov: string,
    public popis: string
  ) {}
}

