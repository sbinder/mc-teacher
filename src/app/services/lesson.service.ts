import { Injectable } from '@angular/core';
import { Progress } from '../models/progress.model';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Href } from './href.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class LessonService {

    private tasks = [];

  constructor(private http: HttpClient) { }

  saveTask(task: Progress) {
    console.log('saving', task);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put(Href.href + 'progress', JSON.stringify(task), {headers});
  }

  updateTask(task: Progress) {
    console.log('should be updating task here');
  }

  loadTasks(students: Student[], all = true) {
    console.log('Loading tasks.');
    let slist = [];
    students.forEach((s) => {
      slist.push(s.stid);
    });
    this.http.post<Progress[]>(Href.href + 'progress', slist)
    .subscribe(
      res => {
        if (res) {
          if (all) {
            this.tasks.length = 0;
          }
          res.forEach((t) => {
            this.tasks.push(t);
          });
        }
      },
      err => {

        console.log('ERROR:', err);
      }
    );
    // console.log('loaded task list: ', this.tasks);
  }

  getTasks() {
    return this.tasks;
  }
}

