import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Href } from './href.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { LessonService } from './lesson.service';
import { Hub } from './hub.service';

@Injectable()
export class StudentsService {

  private students: Student[] = [];

  private selectedStudents = [];
  private groupSelected = [false, false, false, false, false];

  public studentChange = new Subject<{ s: number, p: boolean }>();

  constructor(private http: HttpClient, private lessonService: LessonService,
    private hub: Hub) {
    console.log('initializing Signalr connection');

    // Declare a proxy to reference the hub.

    // Create a function that the hub can call to broadcast messages.
    let my = this;
    if (this.hub.ClassHub !== undefined) {
    this.hub.ClassHub.client.broadcastCheckin = function (stid: number, status: boolean) {
      if (status) {
        my.addStudent(stid);
      } else {
        my.removeStudent(stid);
      }
    }
  }
}

allStudentRequest() {
  return this.http.get<Student[]>(Href.href + 'student');
}

emitChange(alert: { s: number, p: boolean }) {
  this.studentChange.next(alert);
}


loadStudents() {

  this.http.post<Student[]>(Href.href + 'student', '')
    .subscribe(
    res => {
      // console.log('preloading students', res);
      if (res) {
        this.students.length = 0;
        res.forEach((t) => {
          this.students.push(t);
        });
        if (this.students.length > 0) {
          this.lessonService.loadTasks(this.students);
          this.emitChange({ s: 0, p: true });
        }
      }
    },
    err => {
      alert('Cannot connect to class server. Is Checkin page running?');
      // console.log(err);
    }
    );
}

getStudents() {
  return this.students;
}

getSelections() {
  return this.groupSelected;
}

getSelectedStudents() {
  // this.selectedStudents = [];
  this.selectedStudents.length = 0;
  this.students.forEach(element => {
    if (element.selected) {
      this.selectedStudents.push(element);
    }
  });
  if (this.selectedStudents.length === 0) {
    return this.students;
  }
  return this.selectedStudents;
}

isAnyStudentSelected() {
  this.students.forEach(element => {
    if (element.selected) { return true; }
  });
  return false;
}

// addStudent(st: Student) {
addStudent(stn: number) {
  const my = this;
  this.http.get<Student>(Href.href + 'student/' + stn)
    .subscribe(st => {
      if (st) {
        for (const s of my.students) {
          if (s.stid === stn) {
            return;
          }
        }
        for (let i = 0; i < my.groupSelected.length; i++) {
          if (my.groupSelected[4] || my.groupSelected[st.liturgy]) {
            st.selected = true;
          }
        }
        my.students.push({ ...st });
        my.getSelectedStudents();
        my.lessonService.loadTasks([st], false);
        my.emitChange({ s: stn, p: true });
      }
    },

    err => {
      console.log(err);
    });


}
removeStudent(stn: number) {
  for (let i = 0; i < this.students.length; i++) {
    if (this.students[i].stid === stn) {
      this.students.splice(i, 1);
      this.getSelectedStudents();
      this.emitChange({ s: stn, p: false });
      return;
    }
  }

  /*
  const s = { ...this.students };
  this.students.length = 0;
  s.forEach(student => {
    if (student.stid !== stn) {
      this.students.push(student);
    } else {console.log('removed', stn);}
  });
  console.log('after removal:', this.students);
*/

}

}
