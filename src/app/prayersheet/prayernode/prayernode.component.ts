import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student.model';
import { ModeService } from '../../services/mode.service';
import { Prayer } from '../../models/prayer.model';
import { Progress } from '../../models/progress.model';
import { LessonService } from '../../services/lesson.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-prayernode',
  templateUrl: './prayernode.component.html',
  styleUrls: ['./prayernode.component.css'],
})
export class PrayernodeComponent implements OnInit {
  ClassHub: any;

  @Input('student') student: Student;
  @Input('prayer') prayer: Prayer;

  private _progress: Progress;
  private _origProgress: Progress;
  ageString = '';

  @Input() set progress(p: Progress) {
    this._progress = p;
    this.ageString = this.getAgeString();
    // console.log(this.student, this.progress);
    if (!this._origProgress) {
      this._origProgress = { ...p };
    }
  }
  get progress(): Progress { return this._progress; }

  constructor(public mode: ModeService, private lessonService: LessonService) { }

  ngOnInit() {

    let my = this;
    // Declare a proxy to reference the hub.
    this.ClassHub = $.connection.classHub;
    console.log('ClassHub', this.ClassHub);
    // Create a function that the hub can call to broadcast messages.
    this.ClassHub.client.broadcastProgress = function (channel, stid, tid, taskid, rating, tcomment, scomment) {
      console.log('got update', stid, taskid, rating, tcomment, scomment);
      my.lessonService.updateTask(new Progress(stid, taskid, tid, rating, tcomment, scomment));
    };
    $.connection.hub.start();

  }

  checkFields() {
    if (this._progress.rating !== this._origProgress.rating ||
      this.progress.tcomment !== this._origProgress.tcomment ||
      this.progress.scomment !== this._origProgress.scomment) {
      const my = this;

      // update DB

      this.ClassHub.server.progress(123, this._progress.stid, this._progress.tid,
        this._progress.taskid, this._progress.rating,
        this._progress.tcomment, this._progress.scomment );

      /*
      this.lessonService.saveTask(this._progress)
        .subscribe(
        (res) => {
          my._progress.changed = new Date();
          if (!my._progress.assigned) {
            my._progress.assigned = my._progress.changed;
          }
          my._origProgress = { ...my._progress };
          my.ageString = my.getAgeString();
        },
        (err) => {
          console.log('Error', err);
        });
        */
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
    const w = Math.floor(( Date.now() - +(new Date(o))) / 604800000);
    // const n = Date.now();
    // const a = new Date(o);
    // const d = n - +a;
    // const w = Math.floor((d / 604800000));
    // console.log('N', n, 'A', a, 'Dif', d, 'weeks:', w );
    if (w === NaN) {return '';}
    return w.toString();
  }

  getAgeString(): string {
    const a = this.age();
    const l = this.lastheard();
    if (a.length > 0 && l.length > 0) {
      return a + '/' + l;
    } else {
      return a;
    }
  }

  age(): string {
    return this.weeksSince(this._progress.assigned);
  }

  lastheard(): string
  {
    return this.weeksSince(this._progress.changed);
  }

}
