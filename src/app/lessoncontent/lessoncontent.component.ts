import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-lessoncontent',
  templateUrl: './lessoncontent.component.html',
  styleUrls: ['./lessoncontent.component.css']
})
export class LessoncontentComponent implements OnInit {
  @Output() endLesson = new EventEmitter();
  @Input() student;

  constructor() { }

  ngOnInit() {
  }

  sendEnd() {
    this.endLesson.emit();
  }
}
