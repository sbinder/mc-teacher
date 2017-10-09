import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Prayer } from '../models/prayer.model';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student.model';
import { ModeService } from '../services/mode.service';
// import { Observable } from 'rxjs/Observable';
import { LessonService } from '../services/lesson.service';
import { Progress } from '../models/progress.model';

@Component({
  selector: 'app-prayersheet',
  templateUrl: './prayersheet.component.html',
  styleUrls: ['./prayersheet.component.css']
})
export class PrayersheetComponent implements OnInit, OnDestroy {

  students$ = this.STService.studentChange.subscribe(s => {
    this.changes.detectChanges();
  });

  students: Student[];
  mode: ModeService;
  progress: Progress[];


  constructor(private STService: StudentsService,
    private MService: ModeService,
    private LsnService: LessonService,
    private changes: ChangeDetectorRef) { }

  @Input() currentPrayer: Prayer;
  @Output() goBack = new EventEmitter();

  ngOnInit() {
    this.students = this.STService.getSelectedStudents();
    this.progress = this.LsnService.getTasks();
    this.mode = this.MService;


}

  returnClicked() {
    this.goBack.emit();
  }

  myPrayer(stid: number, taskid: number) {
    let pr: Progress;
    this.progress.forEach((p) => {
      if (p.stid === stid && p.taskid === taskid) {
        pr = p;
      }
    });
    if (pr) {
      return pr;
    } else {
      // FIX TEACHER ID!
      // Create a new (temporary) progress marker if none is found
      const newp = new Progress(stid, taskid, 1, 0, '', '');
      this.progress.push(newp);
      return newp;
    }
  }

  pClick() { this.MService.setPrayerMode('P'); }
  cClick() { this.MService.setPrayerMode('C'); }
  aClick() { this.MService.setPrayerMode('A'); }

  ngOnDestroy() {
    if (this.students$ !== undefined) {
      this.students$.unsubscribe();
    }
  }
}
