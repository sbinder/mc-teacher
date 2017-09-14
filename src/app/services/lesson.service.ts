import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Progress } from '../models/progress.model';

@Injectable()
export class LessonService {
  constructor(private http: Http) { }

//  saveTask(task: Progress) {
//    return this.http.post('http://localhost:1', task);
//  }
}

