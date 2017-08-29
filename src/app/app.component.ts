import { Component, OnInit } from '@angular/core';
import { Prayer } from './models/prayer.model';
import { Student } from './models/student.model';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {

  students: Student[];
  groupSelected: boolean[];

  title = 'Group Lesson Portal';
  showstudents = true;
  workingPrayer: Prayer;


  constructor(private StudentService: StudentsService) { }

  ngOnInit() {
    this.students = this.StudentService.getStudents();
    this.groupSelected = this.StudentService.getSelections();
  }


  prayerSelected(event: Prayer) {
    this.workingPrayer = event;
    this.showstudents = false;
  }

  newStudentTest() {
    const tm = new Date();
    const st = new Student(tm.getSeconds(), 'Test', tm.getSeconds().toString(), 1, tm);
    this.StudentService.addStudent(st);
  }
}
