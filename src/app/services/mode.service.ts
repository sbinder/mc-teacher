import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Prayer } from '../models/prayer.model';

@Injectable()
export class ModeService {
  classroom: boolean;
  prayerState: string;
  Mode: string;
  prayer_display_state: Subject<string> = new Subject();
  teaching_mode: Subject<string> = new Subject();

  workingPrayer: Subject<Prayer> = new Subject();
  DisplayMode: Subject<string> = new Subject();
//  public workingPrayer: Prayer;
//  public DisplayMode: string;

  constructor() {
    this.setPrayerMode('A');
    this.setDisplayMode('S'); // start with student list
    this.classroom = true;
    this.setMode('C');  // start with ''
  }

  setPrayerMode(mode: string) {
    this.prayerState = mode;
    this.prayer_display_state.next( this.prayerState );
  }

  setWorkingPrayer(prayer: Prayer) {
    this.workingPrayer.next(prayer);
    this.setDisplayMode('P');
  }

  setDisplayMode(mode: string) {
    this.DisplayMode.next(mode);
  }

  setMode(mode: string) {
    this.Mode = mode;
    this.teaching_mode.next( this.Mode );
  }

  // getPrayerMode() {
  //   return this.prayerState;
  // }

  // private prayernode_display_status = new Subject<any>();

  // constructor() { }
  // getStatus(name: string) {
  //   // return this.modes[name];
  //   return this.modes.status;
  // }
  // getModes() {
  //   return this.modes;
  // }
  // setStatus(name: string, status: string) {
  //   this.modes[name] = status;
  // }


  // getPrayerNodeMode() { return this.prayernode_display_status.asObservable(); }
  // getPrayerNodeMode() { return this.prayernode_display_status; }
  // setPrayerNodeMode(mode: string) { this.prayernode_display_status = mode; }

}
