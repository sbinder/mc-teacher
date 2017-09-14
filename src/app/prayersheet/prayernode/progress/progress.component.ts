import { Component, OnInit } from '@angular/core';
// import { MdSliderChange } from '@angular/material/material';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  prayer: object;
  newscore: number;

  constructor() { }

  ngOnInit() {
  }
 sliderChange(event: Event) {
   this.newscore = event['value'];
   // this.prayer = event.source;
  console.log(event);
 }
  blurry(stid: number, prid: number) {
    console.log('Changing ' + stid + ', ' + prid + ' to ' + this.newscore);
  }
}
