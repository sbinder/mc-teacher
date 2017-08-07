import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PrayerlistComponent } from './prayerlist/prayerlist.component';
import { PrayersService } from './services/prayers.service';
import { StudentsService } from './services/students.service';
import { RatinglistComponent } from './ratinglist/ratinglist.component';


@NgModule({
  declarations: [
    AppComponent,
    PrayerlistComponent,
    RatinglistComponent
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule
  ],
  providers: [PrayersService, StudentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
