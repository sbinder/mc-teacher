import { Component, OnInit } from '@angular/core';

// dummy data
const prayers = [
  {id: 1, name: 'Tallit Blessing', group: 3},
  {id: 2, name: 'Shehecheyanu', group: 3},
];

@Component({
  selector: 'app-prayerlist-component',
  templateUrl: './prayerlist-component.component.html',
  styleUrls: ['./prayerlist-component.component.css']
})
export class PrayerlistComponentComponent implements OnInit {
  prayerlist = prayers;
  constructor() { }

  ngOnInit() {
  }

}
