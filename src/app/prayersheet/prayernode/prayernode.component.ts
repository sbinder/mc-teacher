import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student.model';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-prayernode',
  templateUrl: './prayernode.component.html',
  styleUrls: ['./prayernode.component.css']
})
export class PrayernodeComponent implements OnInit {
  @Input('student') student: Student;

  mode: string;
  scomment = '';
  tcomment = '';

  constructor(private MService: ModeService) {} // this.MService = MService; }

  ngOnInit() {
    // this.mode = this.MService.getPrayerNodeMode();
  }

}
