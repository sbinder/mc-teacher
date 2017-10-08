import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule, BrowserAnimationsModule,
    MaterialModule, HttpClientModule, FormsModule
  ],
  providers: [PrayersService, StudentsService, ModeService, LessonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
