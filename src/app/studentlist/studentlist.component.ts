import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { ModeService } from '../services/mode.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],
})
export class StudentlistComponent implements OnInit, OnDestroy {

  students$: Subscription;

  groups = [false, false, false, false];

  selected$  = this.modeService.workingGroup.subscribe(g => {
    this.groups = g;
  });

  students: Student[] = [];
  selectedStudent = 0;

  private divisor = 1000 * 60 * 60 * 24 * 7;
  private now = new Date().valueOf() / this.divisor;



  constructor(private STService: StudentsService, private changes: ChangeDetectorRef,
    private modeService: ModeService) { }

  toggleStudent(id) {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].stid === id) {
        this.students[i].selected = !this.students[i].selected;
      //  if (this.students[i].selected &&
      //    !this.groups[this.students[i].group] ) {
      //  }
      }
    }
  }

  setGroup(id: number, include: boolean) {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].group === +id || +id === 4) {
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
      // console.log('got student', s);
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

  weeksUntil(target: string) {
    const then = (new Date(+target.substr(0, 4),
      +target.substr(5, 2), +target.substr(7, 2)))
      .valueOf() / this.divisor;
        // return (target.valueOf() - new Date().valueOf());
    return Math.floor( then - this.now );
  }

  ngOnDestroy() {
    if (this.students$ !== undefined) {
      this.students$.unsubscribe();
    }
  }
}
