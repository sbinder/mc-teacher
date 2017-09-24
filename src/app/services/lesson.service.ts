import { Injectable } from '@angular/core';
import { Progress } from '../models/progress.model';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Href } from './href.service';

@Injectable()
export class LessonService {

  // private tasks: Progress[];
  private tasks = [];
//  [ new Progress(3, 2, 1, 7.5, 'teacher com', 'student com') ];

  constructor(private http: HttpClient) { }

  saveTask(task: Progress) {

    this.http.put(Href.href + 'progress', Progress);
  }

  loadTasks(students: Student[]) {
    console.log('Loading tasks.');
    let slist = [];
    students.forEach((s) => {
      slist.push(s.stid);
    });
    this.http.post<Progress[]>(Href.href + 'classroom', slist)
    .subscribe(
      res => {
        if (res) {
          this.tasks.length = 0;
          res.forEach((t) => {
            this.tasks.push(t);
          });
        }
      },
      err => {

        console.log(err);
      }
    );
    // console.log('loaded task list: ', this.tasks);
  }

  getTasks() {
    return this.tasks;
  }
}

