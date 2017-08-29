import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Prayer } from '../models/prayer.model';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student.model';
import { ModeService } from '../services/mode.service';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-prayersheet',
  templateUrl: './prayersheet.component.html',
  styleUrls: ['./prayersheet.component.css']
})
export class PrayersheetComponent implements OnInit {

  students: Student[];
  mode: ModeService;

  constructor(private STService: StudentsService, private MService: ModeService) { }

  @Input() currentPrayer: Prayer;
  @Output() goBack = new EventEmitter();

  ngOnInit() {
    this.students = this.STService.getSelectedStudents();
    this.mode = this.MService;
  }

  returnClicked() {
    this.goBack.emit();
  }

  pClick() { this.MService.setPrayerMode('P'); }  // prayer_display_state.next({ mode: 'P' }); }
  cClick() { this.MService.setPrayerMode('C'); }  // prayer_display_state.next({ mode: 'C' }); }
  aClick() { this.MService.setPrayerMode('A'); }  // prayer_display_state.next({ mode: 'A' }); }
}
