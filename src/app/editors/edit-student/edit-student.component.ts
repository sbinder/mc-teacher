import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatDialog, MatNativeDateModule } from '@angular/material';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
  providers: []
})
export class EditStudentComponent implements OnInit {

  student: Student = null;
  target: string;

    slist: Student[];
    teachers: Teacher[];

    lname: string;

    constructor(private http: HttpClient, private dialog: MatDialog,
      public dater: MatNativeDateModule) { }

    ngOnInit() {
      // TEMP:
      this.teachers = new Array<Teacher>();
      const teach = new Teacher();
      teach.fname = 'Hello';
      teach.lname = 'Kitty';
      teach.tid = 1;
      this.teachers.push(teach);
    }

    createStudent() {
      this.student = new Student();
      this.target = '';
    }

    findStudent() {
      const my = this;
      if (this.lname.length === 0) { return; }
      this.http.get<Student[]>(environment.href + 'student?namepart=' + this.lname)
      .subscribe(res => {
        my.slist = res.slice();
        if (my.slist.length === 1) {
          my.student = my.slist[0];
          // my.target = this.yyyymmdd(my.student.target);
          console.log('loaded student', this.student);
          return;
        }
        const pp = new Array<{ name: string, value: any }>();
        this.slist.forEach(element => {
          const name1 = element.lname + ', ' + element.fname;
          pp.push({ name: name1, value: element.stid });
        });
        const dialogRef = this.dialog.open(SelectDialogComponent,
          { data: {title: 'Select Parent', picklist: pp} });

          dialogRef.afterClosed().subscribe(stid => {
            if (stid !== undefined) {
              this.slist.forEach(element => {
                if (element.stid === stid) {
                  this.student = element;
                  // this.target = this.yyyymmdd(this.student.target);
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

//    yyyymmdd(date: Date) {
//      console.log('target', date);
//      const d = date.toISOString().substring(0, 10);
//      console.log(d);
//      return d;
//      const Y = date.getFullYear.toString();
//      let M = date.getMonth.toString();
//      let D = date.getDay.toString();
//      if (M.length < 2) { M = '0' + M; }
//      if (D.length < 2) { D = '0' + D; }
//      return Y + '-' + M + '-' + D;
 //   }
  }
