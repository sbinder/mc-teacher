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
  private scomment: string;
  private tcomment: string;
  @Input('student') student: Student;
  @Input('prayer') prayer: Prayer;

  private _progress: Progress;

  @Input() set progress(p: Progress) {
    if (!p) { return; }
    this._progress = p;
    if (!this.scomment) {
      this.scomment = p.scomment;
      this.tcomment = p.tcomment;
    }
  }
  get progress(): Progress { return this._progress; }

  constructor(public mode: ModeService) {}

  ngOnInit() { }

  gotNewRating(e) {
    console.log(e);
  }

  scommentBlur(e) {
    console.log('Teacher: ' + e.target.value);
  }
  tcommentBlur(e) {
    console.log('Student: ' + e.target.value);
  }
}
