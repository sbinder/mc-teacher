import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student.model';
import { ModeService } from '../../services/mode.service';
import { Prayer } from '../../models/prayer.model';
import { Progress } from '../../models/progress.model';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-prayernode',
  templateUrl: './prayernode.component.html',
  styleUrls: ['./prayernode.component.css'],
})
export class PrayernodeComponent implements OnInit {
  @Input('student') student: Student;
  @Input('prayer') prayer: Prayer;

  private _progress: Progress;
  private _origProgress: Progress;

  @Input() set progress(p: Progress) {
    this._progress = p;
    // console.log(this.student, this.progress);
    if (!this._origProgress) {
      this._origProgress = { ...p };
    }
  }
  get progress(): Progress { return this._progress; }

  constructor(public mode: ModeService, private lessonService: LessonService) { }

  ngOnInit() { }

  checkFields() {
    if (this._progress.rating !== this._origProgress.rating ||
      this.progress.tcomment !== this._origProgress.tcomment ||
      this.progress.scomment !== this._origProgress.scomment) {
      const my = this;
      // update DB
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

  weeksSince(o: any) {
    if (!o) {
      return '';
    }
    const n = Date.now();
    const a = new Date(o);
    const d = n - +a;
    const w = Math.floor((d / 604800000));
    // console.log('N', n, 'A', a, 'Dif', d, 'weeks:', w );
    if (w === NaN) {return '';}
    return w.toString();
  }


  age() {
    return this.weeksSince(this._progress.assigned);
  }

  lastheard()
  {
    return this.weeksSince(this._progress.changed);
  }

}
