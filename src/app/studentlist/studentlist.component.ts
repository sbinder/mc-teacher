import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],

})
export class StudentlistComponent implements OnInit {

  STService: StudentsService;
  students: Student[];
  selectedStudent = 0;
  @Input() groupSelected: [boolean];

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
      if (this.students[i].Group === +id || +id === 4) {
        this.students[i].selected = include;
      }
    }
  }

  updateGroups(groupChange: {group: number, selected: boolean}) {
    this.setGroup(groupChange.group, groupChange.selected);
  }

  ngOnInit() {
    this.students = this.STService.getStudents();
  }
==> WORKING ON THIS PART:
  anyStudentSelected() {
    this.students.forEach(element => {
      if (element.selected) { return true; }
    });
    return false;
  }

  groupName(gid: number) {
    switch (gid) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'Both';
      case 3:
        return 'Custom';
      default:
        return 'ALL';
    }
  }
}
