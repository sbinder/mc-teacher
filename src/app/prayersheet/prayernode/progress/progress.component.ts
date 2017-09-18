import { Component, OnInit, Input } from '@angular/core';

import { Progress } from '../../../models/progress.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  // inputs: {''}
})
export class ProgressComponent implements OnInit {
//  @Input() prid: number;
//  @Input() stid: number;
  @Input() progress: Progress;

  newscore: number;

  constructor() { }

  ngOnInit() {
  }
 sliderChange(event: Event) {
   this.newscore = event['value'];
 }
  blurry() {
    console.log('Changing ' + this.progress.stid + ', ' + this.progress.taskid + ' to ' + this.newscore);
  }

}
