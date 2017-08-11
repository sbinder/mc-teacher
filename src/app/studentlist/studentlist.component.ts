import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],

})
export class StudentlistComponent implements OnInit {

  STService: StudentsService;
  students: Student[] = [];
  selectedStudent = 0;

  constructor(STService: StudentsService) {
    this.STService = STService;
  }

  toggleStudent(id) {
    for (let i = 0 ; i < this.students.length ; i++) {
      if (this.students[i].STID === id) {
        this.students[i].selected = !this.students[i].selected;
      }
    }
  }

  setGroup(id: number, include: boolean) {
    for (let i = 0 ; i < this.students.length ; i++) {
      if (this.students[i].Group === id) {
        this.students[i].selected = include;
      }
    }
  }

  ngOnInit() {
    const slist = this.STService.getStudents();
    slist.forEach(element => {
      const s = new Student(element.id, element.fname, element.lname, element.group);
      this.students.push(s);
    });
  }

}
