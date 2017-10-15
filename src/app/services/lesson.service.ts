import { Injectable, OnInit } from '@angular/core';
import { Progress } from '../models/progress.model';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Href } from './href.service';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Hub } from './hub.service';

@Injectable()
export class LessonService {

  private tasks = [];

  public changedProgress = new Subject<Progress>();

  constructor(private http: HttpClient, private hub: Hub) {
    console.log('initializing lesson connection');
    const my = this;

    // Create a function that the hub can call to broadcast messages.
    if (this.hub.ClassHub === undefined) { return; }
    this.hub.ClassHub.client.broadcastProgress = function (progress: Progress) {
      my.updateTask(progress);
    };


//    this.ClassHub.client.broadcastProgress = function (progress: Progress) {
//      my.updateTask(progress);
//    };

  }

  emitProgress(progress: Progress) {
    this.changedProgress.next(progress);
  }

  saveTask(task: Progress, classroom: boolean = true) {
    if (classroom) {
      if (this.hub.ClassHub !== undefined) {
        this.hub.ClassHub.server.progressUpdate(1, task);
      }
    } else {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
      return this.http.put(Href.href + 'progress', JSON.stringify(task), { headers });
    }
  }

  loadTasks(students: Student[], all = true) {
    if (students.length === 0) {
      return;
    }
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

        console.log('ERROR:', err, err.statusText);
      }
      );
  }

  getTasks() {
    return this.tasks;
  }

  updateTask(task: Progress) {
    // const t = { ...this.tasks };
    const tk: Progress[] = [];
    this.tasks.forEach(element => {
      tk.push(element);
    });
    this.tasks.length = 0;
    tk.forEach(e => {
      if (e.stid === task.stid && e.taskid === task.taskid) {
        this.tasks.push(task);
      } else {
        this.tasks.push(e);
      }
    });
    this.emitProgress(task);
  }
}
