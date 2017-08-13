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

  constructor() { }
  getStudents() {
    return this.students; // .slice();
  }

  getSelectedStudents(orAll = true) {
    this.selectedStudents = [];
    this.students.forEach(element => {
      if (element.selected) {
        this.selectedStudents.push(element);
      }
    });
    if (this.selectedStudents.length === 0 && orAll) {
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



}
