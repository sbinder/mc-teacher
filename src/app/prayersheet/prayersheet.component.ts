import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Prayer } from '../models/prayer.model';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-prayersheet',
  templateUrl: './prayersheet.component.html',
  styleUrls: ['./prayersheet.component.css']
})
export class PrayersheetComponent implements OnInit {

  students: Student[];
   mode = 'A';

  constructor(private STService: StudentsService) {
    this.STService = STService;
  }

  @Input() currentPrayer: Prayer;
  @Output() goBack = new EventEmitter();
  @Output() displayMode = new EventEmitter<string>();

  ngOnInit() {
    this.students = this.STService.getSelectedStudents(true);
    this.displayMode.emit('A');
  }

  returnClicked() {
    this.goBack.emit();
  }

  pClick() { this.mode = 'P'; this.displayMode.emit('P'); }
  cClick() { this.mode = 'C'; this.displayMode.emit('C'); }
  aClick() { this.mode = 'A'; this.displayMode.emit('A'); }
}
