import { Injectable, OnInit } from '@angular/core';
import { Progress } from '../models/progress.model';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Href } from './href.service';
import { HttpHeaders } from '@angular/common/http';

declare var jquery: any;
declare var $: any;

@Injectable()
export class LessonService {
  ClassHub: any;
  private tasks = [];

  constructor(private http: HttpClient) {
    console.log('initializing connection')
    const my = this;
    // Declare a proxy to reference the hub.
    $.connection.hub.url = 'http://localhost:55199/signalr'; // TESTING ONLY
    this.ClassHub = $.connection.classHub;

    // Create a function that the hub can call to broadcast messages.
    this.ClassHub.client.broadcastProgress = function (progress: Progress) {
      console.log('Got a broadcast:', progress);
    };
    $.connection.hub.start()
      .done(() => {
        my.ClassHub.server.joinGroup(1);
      });
  }

  saveTask(task: Progress) {
    console.log('broadcasting', task);
    this.ClassHub.server.progressUpdate(task);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put(Href.href + 'progress', JSON.stringify(task), { headers });
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

