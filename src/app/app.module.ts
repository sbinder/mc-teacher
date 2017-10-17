import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PrayerlistComponent } from './prayerlist/prayerlist.component';
import { PrayersService } from './services/prayers.service';
import { StudentsService } from './services/students.service';
import { RatinglistComponent } from './ratinglist/ratinglist.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { StudentlistheaderComponent } from './studentlist/studentlistheader/studentlistheader.component';
import { PrayersheetComponent } from './prayersheet/prayersheet.component';
import { PrayernodeComponent } from './prayersheet/prayernode/prayernode.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { ProgressComponent } from './prayersheet/prayernode/progress/progress.component';
import { CommentsComponent } from './prayersheet/prayernode/comments/comments.component';
import { ModeService } from './services/mode.service';
import { LessonService } from './services/lesson.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModeselectComponent } from './modeselect/modeselect.component';
import { LessonComponent } from './lesson/lesson.component';
import { ClassComponent } from './class/class.component';
import { Hub } from './services/hub.service';
import { ClasslistComponent } from './classlist/classlist.component';
import { LessoncontentComponent } from './lessoncontent/lessoncontent.component';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './services/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { CheckinlistComponent } from './checkinlist/checkinlist.component';

const appRoutes: Routes = [
  { path: '', component: ModeselectComponent },
  { path: 'lesson', component: LessonComponent },
  { path: 'class', component: ClassComponent },
  { path: 'login', component: SigninComponent },
  { path: 'checkin', component: CheckinlistComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PrayerlistComponent,
    RatinglistComponent,
    StudentlistComponent,
    StudentlistheaderComponent,
    PrayersheetComponent,
    PrayernodeComponent,
    ProgressComponent,
    CommentsComponent,
    ModeselectComponent,
    LessonComponent,
    ClassComponent,
    ClasslistComponent,
    LessoncontentComponent,
    SigninComponent,
    CheckinlistComponent
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule, BrowserAnimationsModule,
    MaterialModule, HttpClientModule, FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PrayersService, StudentsService, ModeService, LessonService, Hub, AuthService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
