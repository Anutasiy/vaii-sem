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
const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'coursesAdd', component: CoursesAddComponent},
  {path: 'coursesUpdate/:id', component: CoursesUpdateComponent}
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
    CoursesUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
