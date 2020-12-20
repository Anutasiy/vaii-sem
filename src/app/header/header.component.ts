import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  user;
  constructor(
    private authComponent: AuthService
  ) { }

  ngOnInit() {
    this.userSub = this.authComponent.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.user = user;
      console.log(!user);
      console.log(!!user);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

