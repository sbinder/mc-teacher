import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-prayernode',
  templateUrl: './prayernode.component.html',
  styleUrls: ['./prayernode.component.css']
})
export class PrayernodeComponent implements OnInit {
  @Input('student') student: Student;

  scomment = '';
  tcomment = '';

  constructor() { }

  ngOnInit() {
  }

}
