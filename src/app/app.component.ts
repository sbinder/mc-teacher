import { Component, OnInit } from '@angular/core';
import { Prayer } from './models/prayer.model';
import { Student } from './models/student.model';
import { StudentsService } from './services/students.service';
import { LessonService } from './services/lesson.service';
import { PrayersService } from './services/prayers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {

  students: Student[];
  public prayers: Prayer[];

  groupSelected: boolean[];

  title = 'Group Lesson Portal';
  DisplayMode = '';
  // showstudents = true;
  workingPrayer: Prayer;


  constructor(private StudentService: StudentsService,
    private lessonservice: LessonService) {}

  ngOnInit() {
    this.StudentService.loadStudents();
    this.groupSelected = this.StudentService.getSelections();
    this.lessonservice.loadTasks(this.StudentService.getStudents());
  }


  prayerSelected(event: Prayer) {
    this.workingPrayer = event;
    this.DisplayMode = 'P';
    // this.showstudents = false;
  }

}
