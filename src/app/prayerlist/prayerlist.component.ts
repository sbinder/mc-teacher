import { Component, OnInit } from '@angular/core';

import { PrayersService } from '../services/prayers.service';

@Component({
  selector: 'app-prayerlist',
  templateUrl: './prayerlist.component.html',
  styleUrls: ['./prayerlist.component.css']
})
export class PrayerlistComponent implements OnInit {

  PrayerService: PrayersService;
  prayers = [];

  constructor(PrayerService: PrayersService) {
    this.PrayerService = PrayerService;
  }

  ngOnInit() {
    this.prayers = this.PrayerService.getPrayers();
  }

}
