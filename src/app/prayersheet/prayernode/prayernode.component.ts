import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Student } from '../../models/student.model';
import { ModeService } from '../../services/mode.service';
import { Prayer } from '../../models/prayer.model';
import { Progress } from '../../models/progress.model';
import { LessonService } from '../../services/lesson.service';
import { element } from 'protractor';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-prayernode',
  templateUrl: './prayernode.component.html',
  styleUrls: ['./prayernode.component.css'],
})
export class PrayernodeComponent implements OnInit, OnDestroy {
  @Input('student') student: Student;
  @Input('prayer') prayer: Prayer;

  readOnly = false;
  @Input('lessonMode') lessonMode: boolean;

  progress$ = this.lessonService.changedProgress.subscribe(p => {
    if (this._progress.stid === p.stid && this._progress.taskid === p.taskid) {
      this.progress = p;
      this.changes.detectChanges();
    }
  });


  private _progress: Progress;
  private _origProgress: Progress;

  ageString = '';
  ageHeard = '';
  ageAssigned = '';

  @Input() set progress(p: Progress) {
//    console.log('progress setter');
    this._progress = p;
    this.ageString = this.getAgeString();
    if (!this._origProgress) {
      this._origProgress = { ...p };
    }
  }
  get progress(): Progress { return this._progress; }

  constructor(public mode: ModeService,
    private lessonService: LessonService,
    private changes: ChangeDetectorRef) { }

  ngOnInit() {
//    this.STService.studentChange.subscribe(s => {
//      console.log('prayernode student list change');
//      this.changes.detectChanges();
//    });

  }

  checkFields() {
    if (this._progress.rating !== this._origProgress.rating ||
      this.progress.tcomment !== this._origProgress.tcomment ||
      this.progress.scomment !== this._origProgress.scomment) {
      const my = this;
      // update DB
      if (this.mode.classroom) {
        this.lessonService.saveTask(this._progress);
      } else {
        this.lessonService.saveTask(this._progress)
          .subscribe(
          (res) => {
            my._progress.changed = new Date();
            if (!my._progress.assigned) {
              my._progress.assigned = my._progress.changed;
            }
            my._origProgress = { ...my._progress };
          },
          (err) => {
            console.log('Error', err);
          });
      }
    }
  }

  gotNewRating(e) {
    if (e.target === document.activeElement) { return; }
    this.checkFields();
  }

  scommentBlur(e) {
    if (e.target.classList.contains('ng-pristine')) { return; }
    this.checkFields();
  }
  tcommentBlur(e) {
    if (e.target.classList.contains('ng-pristine')) { return; }
    this.checkFields();
  }

  weeksSince(o: any): string {
    if (!o) {
      return '';
    }
    const w = Math.floor((Date.now() - +(new Date(o))) / 604800000);
    if (w === NaN) { return ''; }
    return w.toString();
  }

  getAgeString(): string {
    const a = this.age();
    const l = this.lastheard();
    if (a.length > 0 && l.length > 0) {
      return l + '/' + a;
    } else {
      return a;
    }
  }


  age() {
    this.ageAssigned = this.weeksSince(this._progress.assigned);
    return this.ageAssigned;
  }

  lastheard() {
    this.ageHeard = this.weeksSince(this._progress.changed);
    return this.ageHeard;
  }

  getStyles() {
    var color: string;
    if (+this.ageHeard > 3) {
      color = 'orange';
    } else if (!this.ageAssigned) {
      color = 'Gainsboro';
    } else {
      color = 'white';
    }
    const styles = {
      'background-color': color
    };
    return styles;
    // {'border': +ageHeard > 3 ? '1px solid red' : 'none',
  }

  ngOnDestroy() {
    if (this.progress$ !== undefined) {
      this.progress$.unsubscribe();
    }
//    if (this.STService.studentChange !== undefined) {
//      this.STService.studentChange.unsubscribe();
//    }
  }
}
