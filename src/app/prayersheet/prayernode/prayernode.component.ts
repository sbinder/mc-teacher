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
  @Input('progress') progress: Progress;

  mode: ModeService;
  scomment = '';
  tcomment = '';

  constructor(private MService: ModeService) {} // this.MService = MService; }

  ngOnInit() {
    this.mode = this.MService;
  }

}
