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
  STService: StudentsService;

  constructor(STService: StudentsService) {
    this.STService = STService;
  }

  @Input() currentPrayer: Prayer;
  @Output() goBack = new EventEmitter();

  ngOnInit() {
    const slist = this.STService.getStudents();
    this.students = [];
    slist.forEach(element => {
      if (element.selected) {
        this.students.push(element);
      }
    });
//    this.students = this.STService.getStudents();
  }

  returnClicked() {
    this.goBack.emit();
  }
}
