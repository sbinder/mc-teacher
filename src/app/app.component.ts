import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prayer } from './models/prayer.model';
import { Student } from './models/student.model';
import { StudentsService } from './services/students.service';
import { LessonService } from './services/lesson.service';
import { PrayersService } from './services/prayers.service';
import { ModeService } from './services/mode.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit, OnDestroy {

  public teachingMode = 'C';  // : string;
  tmSubscription: Subscription;
  DisplayMode = 'C';
  students: Student[];
  public prayers: Prayer[];

  groupSelected: boolean[];

  title = this.DisplayMode === 'L' ?
    'Lesson Portal': 'Group Lesson Portal';

  // showstudents = true;
  workingPrayer: Prayer;


  constructor(private StudentService: StudentsService,
    private lessonservice: LessonService,
    private modeService: ModeService) {}

  ngOnInit() {
    this.StudentService.loadStudents();
    this.groupSelected = this.StudentService.getSelections();
    this.lessonservice.loadTasks(this.StudentService.getStudents());
    this.tmSubscription = this.modeService.teaching_mode.subscribe(m => {
      this.teachingMode = m;
    });
    console.log('Teaching Mode: ', this.teachingMode);
  }


  prayerSelected(event: Prayer) {
    this.workingPrayer = event;
    this.DisplayMode = 'P';
    // this.showstudents = false;
  }

  ngOnDestroy() {
    if (this.tmSubscription !== undefined) { this.tmSubscription.unsubscribe(); }
  }
}
