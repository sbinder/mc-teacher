import { Injectable } from '@angular/core';

@Injectable()
export class StudentsService {

  private students = [
      {id: 1, fname: 'John', lname: 'Smith', group: 3},
      {id: 2, fname: 'Plonit', lname: 'BatPloni', group: 3},
      {id: 3, fname: 'Ploni', lname: 'BenPlonit', group: 3},
    ];

  constructor() { }
  getStudents() {
    return this.students.slice();
  }
}
