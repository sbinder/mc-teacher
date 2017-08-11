import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Prayer } from '../models/prayer.model';
import { PrayersService } from '../services/prayers.service';

@Component({
  selector: 'app-prayerlist',
  templateUrl: './prayerlist.component.html',
  styleUrls: ['./prayerlist.component.css']
})
export class PrayerlistComponent implements OnInit {

  PrayerService: PrayersService;
  prayers: Prayer[] = [];
  @Output() pray = new EventEmitter<Prayer>();

  constructor(PrayerService: PrayersService) {
    this.PrayerService = PrayerService;
  }

  ngOnInit() {
    this.prayers = this.PrayerService.getPrayers();
  }

  prayerClicked(id: number) {
    this.prayers.forEach(element => {
      if (element.TaskID === +id) {
        this.pray.emit(element);
        return;
      }
    });
  }

}
