import { Injectable, OnInit } from '@angular/core';
import { Progress } from '../models/progress.model';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Href } from './href.service';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

declare var jquery: any;
declare var $: any;

@Injectable()
export class LessonService {
  ClassHub: any;
  private tasks = [];

  public changedProgress = new Subject<Progress>();

  constructor(private http: HttpClient) {
    console.log('initializing lesson connection');
    const my = this;
    // Declare a proxy to reference the hub.
    $.connection.hub.url = 'http://localhost:55199/signalr'; // TESTING ONLY
    this.ClassHub = $.connection.classHub;

    // Create a function that the hub can call to broadcast messages.
    this.ClassHub.client.broadcastProgress = function (progress: Progress) {
      console.log('Got a broadcast:', progress);
      my.updateTask(progress);
    };

    $.connection.hub.start()
      .done(() => {
        my.ClassHub.server.joinGroup(1);
      });
  }

  emitProgress(progress: Progress) {
    this.changedProgress.next(progress);
  }

  saveTask(task: Progress, classroom: boolean = true) {
    if (classroom) {
      console.log('broadcasting', task);
      this.ClassHub.server.progressUpdate(1, task);
    } else {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
      return this.http.put(Href.href + 'progress', JSON.stringify(task), { headers });
    }
  }

  loadTasks(students: Student[], all = true) {
    if (students.length == 0) { return; }
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
        console.log('Tasks', this.tasks);
      },
      err => {

        console.log('ERROR:', err, err.statusText);
      }
      );
    // console.log('loaded task list: ', this.tasks);
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
