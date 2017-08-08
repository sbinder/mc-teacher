import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  STService: StudentsService;
  students = [];
  selectedStudent = 0;

  constructor(STService: StudentsService) {
    this.STService = STService;
  }
  toggleStudent(id) {
    for (let i = 0 ; i < this.students.length ; i++) {
      if (this.students[i].id === id) {
        this.students[i].selected = !this.students[i].selected;
      }
    }
  }

  ngOnInit() {
    this.students = this.STService.getStudents();
  }

}
