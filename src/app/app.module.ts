import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesAddComponent } from './courses-add/courses-add.component';
import { CoursesUpdateComponent } from './courses-update/courses-update.component';
import { SortDirective } from './directive/sort.directive';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {AuthGuard} from './auth/auth.guard';
import { CoursesForAllComponent } from './courses-for-all/courses-for-all.component';
import {AlertComponent} from './shared/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { FeedbacksAddComponent } from './feedbacks-add/feedbacks-add.component';

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'courses', component: CoursesComponent, canActivate: [AuthGuard]},
  {path: 'coursesAdd', component: CoursesAddComponent, canActivate: [AuthGuard]},
  {path: 'coursesUpdate/:id', component: CoursesUpdateComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent},
  {path: 'coursesForAll', component: CoursesForAllComponent},
  {path: 'feedbacks', component: FeedbacksComponent},
  {path: 'feedbacksAdd', component: FeedbacksAddComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    TopHeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactsComponent,
    CoursesComponent,
    CoursesAddComponent,
    CoursesUpdateComponent,
    SortDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    CoursesForAllComponent,
    AlertComponent,
    FeedbacksComponent,
    FeedbacksAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
