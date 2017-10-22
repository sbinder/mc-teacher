import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Progress } from '../../../models/progress.model';
import { element } from 'protractor';
import {MatSliderModule} from '@angular/material';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  private _progress: Progress;

  @Input() set progress(p: Progress) {
    this._progress = p;
    if (!this.origScore) {
      this.origScore = p.rating;
    }
  }
  @Input() readOnly = false;

  @Output() rating = new EventEmitter<Progress>();

  get progress(): Progress {
    return this._progress;
  }

  origScore: number;

  constructor() { }

  ngOnInit() { }
/*
  sliderChange(event: Event) {
    this.newscore = event['value'];
  }
*/
  lostFocus($event) {
    if (this._progress.rating !== this.origScore) {
      // this._progress.rating = this.newscore;
      // this.rating.emit(this.newscore);
      this.rating.emit(this._progress);
    }
  }

}
