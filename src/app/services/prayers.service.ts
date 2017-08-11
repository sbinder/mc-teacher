import { Injectable } from '@angular/core';
import { Prayer } from '../models/prayer.model';

@Injectable()
export class PrayersService {

private prayers = [
  new Prayer(1, 0, 'Tallit Blessing', 1),
  new Prayer(2, 0, 'Shehecheyanu', 2),
  new Prayer(3, 0, 'Nissim', 3)
    ];

  constructor() { }
  getPrayers() {
    return this.prayers.slice();
  }
}
