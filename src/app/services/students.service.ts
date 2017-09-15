import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable()
export class StudentsService {

  private students = [
    new Student(1, 'John', 'Smith', 1, new Date('2017-09-01')),
    new Student(2, 'Plonit', 'BatPloni', 0, new Date('2017-09-08')),
    new Student(3, 'Ploni', 'BenPlonit', 1, new Date('2017-09-08')),
    new Student(4, 'Ima', 'Badkind', 3, new Date('2017-09-15')),
  ];
  private selectedStudents = [];
  private groupSelected = [false, false, false, false, false];

  constructor() { }
  getStudents() {
    return this.students; // .slice();
  }

  getSelections() {
    return this.groupSelected;
  }

  getSelectedStudents() {
    // this.selectedStudents = [];
    this.selectedStudents.length = 0;
    this.students.forEach(element => {
      if (element.selected) {
        this.selectedStudents.push(element);
      }
    });
    if (this.selectedStudents.length === 0) {
      return this.students;
    }
    return this.selectedStudents;
  }

  isAnyStudentSelected() {
    this.students.forEach(element => {
      if (element.selected) { return true; }
    });
    return false;
  }

  addStudent(st: Student) {
    for (let i = 0; i < this.groupSelected.length; i++) {
      if (this.groupSelected[4] || this.groupSelected[st.liturgy]) {
        st.selected = true;
      }
    }
    this.students.push(st);
    this.getSelectedStudents();
    console.log(this.students);
  }


}
