import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModeService {

  prayer_display_state: Subject<{ mode: string }> = new Subject();
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
