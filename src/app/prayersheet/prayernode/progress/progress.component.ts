import { Component, OnInit, Input } from '@angular/core';

import { Progress } from '../../../models/progress.model';
import { element } from 'protractor';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  // inputs: {''}
})
export class ProgressComponent implements OnInit {
  private _progress: Progress;
  private _origProgress: Progress;
  //  @Input() progress: Progress;

  @Input() set progress(p: Progress) {
    this._progress = p;
    if (!this.newscore) {
      this.newscore = p.rating;
      this.newtc = p.tcomment;
      this.newsc = p.scomment;
    }
//    if (!this._origProgress) {
//      this._origProgress = {...p};
//    }
  }

  get progress(): Progress {
    return this._progress;
  }

   newscore: number;
   newtc: string;
   newsc: string;

  constructor() { }

  ngOnInit() { }

  sliderChange(event: Event) {
    this.newscore = event['value'];
//    this._progress.rating = event['value'];
//    console.log(this._origProgress.rating, this._progress.rating);
  }

  blurry($event) {
    if (this._progress.rating !== this.newscore) {
      console.log('Changing rating from ' + this.progress.rating + ' to ' + this.newscore);
    }
  }

}
