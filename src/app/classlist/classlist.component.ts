import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css']
})
export class ClasslistComponent implements OnInit {

  lastdate: string;
  students: Student[];
  constructor(private studentService: StudentsService,
    private changes: ChangeDetectorRef) { }

  ngOnInit() {
    this.studentService.allStudentRequest()
      .subscribe(
      res => {
        this.students = res.slice();
        this.changes.detectChanges();
      });
  }

  checkDate(newdate) {
    if (newdate === this.lastdate) {
      return false;
    }
    this.lastdate = newdate;
    return true;
  }

  getdate(ds: string) {
    const d = new Date(+ds.substr(0, 4), +ds.substr(5, 2), +ds.substr(7, 2));
    return d;
  }

  gotClicked(id) {
    this.students.forEach(element => {
      if (element.stid === id) {
        element.selected = !element.selected;
      }
    });
  }

  isSelection() {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].selected) { return true; }
    }
    return false;
  }
}
