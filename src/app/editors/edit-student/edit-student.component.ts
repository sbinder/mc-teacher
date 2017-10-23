import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatDialog, MatNativeDateModule } from '@angular/material';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { Teacher } from '../../models/teacher.model';
import { Prayer } from '../../models/prayer.model';
import { StudentsService } from '../../services/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
  providers: []
})
export class EditStudentComponent implements OnInit {

  student: Student = null;
  target: NgbDateStruct;

    slist: Student[];
    prayers: { group: number, label: string }[];
    teachers: Teacher[];
    blankUsername: boolean;
    lname: string;

    constructor(private http: HttpClient, private dialog: MatDialog,
      private studentService: StudentsService, private router: Router) { }

    ngOnInit() {

      this.teachers = new Array<Teacher>();

      // TEMP:
      const teach = new Teacher();
      teach.fname = 'Hello';
      teach.lname = 'Kitty';
      teach.tid = 1;
      this.teachers.push(teach);

      if (this.studentService.workingStudent != null) {
        this.student = this.studentService.workingStudent;
        this.studentService.workingStudent = null;

      }
    }

    createStudent() {
      this.setupStudent(new Student());
      // this.student.teacher = 0;
    }

    findStudent() {
      const my = this;
      if (this.lname.length === 0) { return; }
      this.http.get<Student[]>(environment.href + 'student?namepart=' + this.lname)
      .subscribe(res => {
        my.slist = res.slice();
        if (my.slist.length === 1) {
          this.setupStudent(my.slist[0]);
          return;
        }
        const pp = new Array<{ name: string, value: any }>();
        this.slist.forEach(element => {
          const name1 = element.lname + ', ' + element.fname;
          pp.push({ name: name1, value: element.stid });
        });
        const dialogRef = this.dialog.open(SelectDialogComponent,
          { data: {title: 'Select Student', picklist: pp} });

          dialogRef.afterClosed().subscribe(stid => {
            if (stid !== undefined) {
              this.slist.forEach(element => {
                if (element.stid === stid) {
                  this.setupStudent(element);
                }
              });
            }
          });
        });
    }


    saveForm() {
      this.http.put(environment.href + 'student', this.student)
      .subscribe(res => {
        this.resetForm();
      }, err => {
        alert(err);
      });

    }

    resetForm() {
      this.lname = '';
      this.student = null;
    }

    updateUsername() {
      if (this.blankUsername) {
        const parts = this.student.email.split('@');
        this.student.username = parts[0];
      }
    }

    setupStudent(s: Student) {
      this.student = s;
      this.fillTarget(this.student.target);
      if (this.student.username !== undefined)
      {
        this.blankUsername = this.student.username.length === 0;
      }
    }

    fillTarget(dt: Date) {
      const now = new Date(dt);
      this.target = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    }

    parentClicked() {
      this.studentService.workingStudent = this.student;
      this.router.navigate(['/parent']);
    }
  }
