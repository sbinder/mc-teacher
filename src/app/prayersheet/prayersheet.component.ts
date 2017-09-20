import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
export class PrayersheetComponent implements OnInit {

  students: Student[];
  mode: ModeService;
  progress: Progress[];


  constructor(private STService: StudentsService,
    private MService: ModeService,
    private LsnService: LessonService) { }

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

  myPrayer(stid: number, prid: number) {
    let pr: Progress;
    this.progress.forEach((p) => {
      if (p.stid === stid && p.taskid === prid) {
        pr = p;
      }
    });
    if (pr) {
      return pr;
    } else {
      return new Progress(stid, prid, 1, 0, '', '');
    }
  }

  pClick() { this.MService.setPrayerMode('P'); }  // prayer_display_state.next({ mode: 'P' }); }
  cClick() { this.MService.setPrayerMode('C'); }  // prayer_display_state.next({ mode: 'C' }); }
  aClick() { this.MService.setPrayerMode('A'); }  // prayer_display_state.next({ mode: 'A' }); }
}
