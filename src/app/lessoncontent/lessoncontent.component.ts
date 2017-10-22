import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PrayersService } from '../services/prayers.service';
import { Prayer } from '../models/prayer.model';
import { Progress } from '../models/progress.model';
import { LessonService } from '../services/lesson.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-lessoncontent',
  templateUrl: './lessoncontent.component.html',
  styleUrls: ['./lessoncontent.component.css']
})
export class LessoncontentComponent implements OnInit {
  @Output() endLesson = new EventEmitter();
  @Input() student;

  prayers: Prayer[];
  progress: Progress[];
  weeksleft: number;

  constructor(private prayerService: PrayersService,
    private lessonService: LessonService) { }

  ngOnInit() {
    this.prayers = this.prayerService.getPrayers();
    this.lessonService.loadTasks([this.student], false);
    this.progress = this.lessonService.getTasks();
    this.weeksleft = this.weeksUntil(this.student.target);
  }

  sendEnd() {
    this.endLesson.emit();
  }

// MOVE TO SERVICE!
  myPrayer(stid: number, taskid: number) {
    let pr: Progress;
    this.progress.forEach((p) => {
      if (p.stid === stid && p.taskid === taskid) {
        pr = p;
      }
    });
    if (pr) {
      return pr;
    } else {
      // FIX TEACHER ID!
      // Create a new (temporary) progress marker if none is found
      const newp = new Progress(stid, taskid, 1, 0, '', '');
      this.progress.push(newp);
      return newp;
    }
  }
    weeksUntil(target: Date) {
    const divisor = 1000 * 60 * 60 * 24 * 7;
    const now = new Date();

    const tg = new Date(target);
    const diff = tg.getTime() - now.getTime();

      console.log(target, tg, now, diff / divisor );
    return Math.floor(diff / divisor) ;
  }

  inGroup(prayer: Prayer, group: number) {
    return prayer.inGroup(group);
  }
}
