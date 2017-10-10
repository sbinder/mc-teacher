import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],
})
export class StudentlistComponent implements OnInit, OnDestroy {

  students$: Subscription;

  students: Student[] = [];
  selectedStudent = 0;
  @Input() groupSelected: [boolean];

  constructor(private STService: StudentsService, private changes: ChangeDetectorRef) { }

  toggleStudent(id) {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].stid === id) {
        this.students[i].selected = !this.students[i].selected;
      }
    }
  }

  setGroup(id: number, include: boolean) {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].liturgy === +id || +id === 4) {
        this.students[i].selected = include;
      }
    }
  }

  updateGroups(groupChange: { group: number, selected: boolean }) {
    this.setGroup(groupChange.group, groupChange.selected);
  }

  ngOnInit() {
    this.students = this.STService.getStudents();
    this.students$ = this.STService.studentChange.subscribe(s => {
      console.log('got student', s);
      this.changes.detectChanges();
    });

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

  ngOnDestroy() {
    if (this.students$ !== undefined) {
      this.students$.unsubscribe();
    }
  }
}
