import { Component, OnInit, Input } from '@angular/core';
// import { MdSliderChange } from '@angular/material/material';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  // inputs: {''}
})
export class ProgressComponent implements OnInit {
  @Input() prid: number;
  @Input() stid: number;
  newscore: number;

  constructor() { }

  ngOnInit() {
  }
 sliderChange(event: Event) {
   this.newscore = event['value'];
 }
  blurry() {
    console.log('Changing ' + this.stid + ', ' + this.prid + ' to ' + this.newscore);
  }
}
