import { Injectable } from '@angular/core';

@Injectable()
export class StudentsService {

  private students = [
      {STID: 1, FName: 'John', LName: 'Smith', Group: 1},
      {STID: 2, FName: 'Plonit', LName: 'BatPloni', Group: 0},
      {STID: 3, FName: 'Ploni', LName: 'BenPlonit', Group: 1},
      {STID: 4, FName: 'Ima', LName: 'Badkind', Group: 3},
    ];

  constructor() { }
  getStudents() {
    return this.students.slice();
  }
}
