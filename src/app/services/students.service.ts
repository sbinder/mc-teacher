import { Injectable } from '@angular/core';

@Injectable()
export class StudentsService {

  private students = [
      {STID: 1, FName: 'John', LName: 'Smith', Group: 1, Target: new Date('2017-09-01')},
      {STID: 2, FName: 'Plonit', LName: 'BatPloni', Group: 0, Target: new Date('2017-09-08')},
      {STID: 3, FName: 'Ploni', LName: 'BenPlonit', Group: 1, Target: new Date('2017-09-08')},
      {STID: 4, FName: 'Ima', LName: 'Badkind', Group: 3, Target: new Date('2017-09-15')},
    ];

  constructor() { }
  getStudents() {
    return this.students.slice();
  }
}
