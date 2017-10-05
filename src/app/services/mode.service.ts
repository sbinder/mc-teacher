import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModeService {
  classroom: boolean;
  prayerState: string;
  prayer_display_state: Subject<string> = new Subject();

  constructor() {
    this.setPrayerMode('A');
    this.classroom = true;
  }

  setPrayerMode(mode: string) {
    this.prayerState = mode;
    this.prayer_display_state.next( this.prayerState );
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
