import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
// import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  // type: string;
  // user;
  private userSub: Subscription;

  constructor(
 //   private dataStorageService: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      // this.isAuthenticated = !!user;
     // console.log(user)
      this.isAuthenticated = !user ? false : true;
      // this.user = user;
      // console.log(!user);
      console.log(!!user);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  // onSaveData() {
  //   this.dataStorageService.storeRecipes();
  // }
  //
  // onFetchData() {
  //   this.dataStorageService.fetchRecipes().subscribe();
  // }
}
