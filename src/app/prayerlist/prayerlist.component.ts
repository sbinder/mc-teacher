import { Component, OnInit } from '@angular/core';

// dummy data
const plist = [
  {id: 1, name: 'Tallit Blessing', group: 3},
  {id: 2, name: 'Shehecheyanu', group: 3},
];


@Component({
  selector: 'app-prayerlist',
  templateUrl: './prayerlist.component.html',
  styleUrls: ['./prayerlist.component.css']
})
export class PrayerlistComponent implements OnInit {

  prayers =  [
    {id: 1, name: 'Tallit Blessing', group: 3},
    {id: 2, name: 'Shehecheyanu', group: 3},
  ];


  constructor() { }

  ngOnInit() {
  }

}
