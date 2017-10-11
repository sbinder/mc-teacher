import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  selectedStudent: Student;

  constructor() { }

  ngOnInit() {
  }
  studentSelect(student: Student) {
    this.selectedStudent = student;
  }

  lessonDone() {
    this.selectedStudent = null;
  }
}
