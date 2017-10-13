import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Student } from '../models/student.model';
import { Prayer } from '../models/prayer.model';
import { StudentsService } from '../services/students.service';
import { LessonService } from '../services/lesson.service';
import { ModeService } from '../services/mode.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit, OnDestroy {

  // tmSubscription: Subscription;
  DisplayMode = 'S';  // start with list
  DisplayModeSub = this.modeService.DisplayMode.subscribe(s => {
    this.DisplayMode = s;
  });
  workingPrayer: Prayer;
  workingPrayerSub = this.modeService.workingPrayer.subscribe(p => {
    this.workingPrayer = p;
  })

  students: Student[];
  public prayers: Prayer[];

  // groupSelected: boolean[];

  constructor(private StudentService: StudentsService,
    private lessonservice: LessonService, private modeService: ModeService) {}

  ngOnInit() {
    // this.groupSelected = this.StudentService.getSelections();
    this.lessonservice.loadTasks(this.StudentService.getStudents());
//    this.tmSubscription = this.modeService.teaching_mode.subscribe(m => {
//      this.teachingMode = m;
//    });

  }
 ngOnDestroy() {
   if (this.DisplayModeSub !== undefined) { this.DisplayModeSub.unsubscribe(); }
 }
}
