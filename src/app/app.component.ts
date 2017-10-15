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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit, OnDestroy {
  public currentRoute: string;

  public teachingMode = 'C';  // : string;

//  title = this.DisplayMode === 'L' ?
//    'Lesson Portal': 'Group Lesson Portal';

  // showstudents = true;


  constructor(private StudentService: StudentsService,
    private lessonservice: LessonService, public router: Router,
    private modeService: ModeService) {}

  ngOnInit() {
    this.StudentService.loadStudents(); // checked-in students only!
    // this.groupSelected = this.StudentService.getSelections();
    this.lessonservice.loadTasks(this.StudentService.getStudents());
    // this.tmSubscription = this.modeService.teaching_mode.subscribe(m => {
      // this.teachingMode = m;
    // });
    // console.log('Teaching Mode: ', this.teachingMode);
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
