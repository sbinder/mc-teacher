import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css']
})
export class ClasslistComponent implements OnInit {

  students: Student[];
  constructor(private studentService: StudentsService) { }

  ngOnInit() {
    this.studentService.allStudentRequest()
    .subscribe(
      res => {
        console.log('preloading students', res);
    });
  }
}
