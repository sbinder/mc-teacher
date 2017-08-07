import { Injectable } from '@angular/core';

@Injectable()
export class PrayersService {

private prayers = [
      {id: 1, name: 'Tallit Blessing', group: 3},
      {id: 2, name: 'Shehecheyanu', group: 3},
    ];

  constructor() { }
  getPrayers() {
    return this.prayers.slice();
  }
}
