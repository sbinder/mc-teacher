import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prayer } from './models/prayer.model';
import { Student } from './models/student.model';
import { StudentsService } from './services/students.service';
import { LessonService } from './services/lesson.service';
import { PrayersService } from './services/prayers.service';
import { ModeService } from './services/mode.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit, OnDestroy {
  public currentRoute: string;

  public teachingMode = 'C';  // : string;

  constructor(private StudentService: StudentsService,
    private lessonservice: LessonService, public router: Router, private http: HttpClient,
    private modeService: ModeService, public authService: AuthService) { }

  ngOnInit() {

    this.StudentService.loadStudents(); // checked-in students only!
    // this.groupSelected = this.StudentService.getSelections();
    this.lessonservice.loadTasks(this.StudentService.getStudents());
    this.router.events.subscribe(r => {
      this.currentRoute = this.router.url.toString();
      // console.log('current route', this.currentRoute);
    });
  }


  public prayerSelected(event: Prayer) {
    //    this.workingPrayer = event;
    this.modeService.setDisplayMode('P');
    //    this.DisplayMode = 'P';
  }


  ngOnDestroy() {
    //  if (this.tmSubscription !== undefined) { this.tmSubscription.unsubscribe(); }
  }
}
