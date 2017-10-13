import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Prayer } from '../models/prayer.model';
import { PrayersService } from '../services/prayers.service';
import { ModeService } from '../services/mode.service';

@Component({
  selector: 'app-prayerlist',
  templateUrl: './prayerlist.component.html',
  styleUrls: ['./prayerlist.component.css']
})
export class PrayerlistComponent implements OnInit, OnDestroy {

//  PrayerService: PrayersService;
  prayers: Prayer[]; // = [];
  @Output() pray = new EventEmitter<Prayer>();
  // @Input() groupSelected: { group: num, selected: boolean };
  groups = [false, false, false, false];

  selected$  = this.modeService.workingGroup.subscribe(g => {
      this.groups = g;
  });


  constructor(private prayerService: PrayersService,
    private modeService: ModeService) {
  }

  ngOnInit() {
    this.prayers = this.prayerService.getPrayers();
    }

  prayerClicked(id: number) {
    // console.log(this.prayers);
    this.prayers.forEach(element => {
      if (element.taskid === +id) {
        this.modeService.setWorkingPrayer(element);

//        this.pray.emit(element);
        return;
      }
    });
  }
  isInactive(prayer: Prayer) {
    if (prayer === undefined) { return false; }
    for (let i = 0; i < 3; i++) {
      if (prayer.group[i] && this.groups[i]) { return false; }
    }
    return true;
  }

  ngOnDestroy() {
    if (this.selected$ !== undefined) { this.selected$.unsubscribe(); }
  }
}
