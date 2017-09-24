import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student.model';
import { ModeService } from '../../services/mode.service';
import { Prayer } from '../../models/prayer.model';
import { Progress } from '../../models/progress.model';

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
      this._origProgress = {...p};
    }
  }
  get progress(): Progress { return this._progress; }

  constructor(public mode: ModeService) {}

  ngOnInit() { }

  checkFields() {
    if (this._progress.rating !== this._origProgress.rating ||
      this.progress.tcomment !== this._origProgress.tcomment ||
      this.progress.scomment !== this._origProgress.scomment) {

        console.log(this._origProgress, this._progress);

        // update DB

        // only do this on success:
        this._origProgress = { ...this._progress };
      }
  }

  gotNewRating(e) {
    this.checkFields();
  }

  scommentBlur(e) {
    this.checkFields();
  }
  tcommentBlur(e) {
    this.checkFields();
  }
}
