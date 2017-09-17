import { Injectable } from '@angular/core';
import { Prayer } from '../models/prayer.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PrayersService {
  private prayers = // [];
  [
    new Prayer(1, 'Tallit Blessing', 1),
    new Prayer(2, 'Shehecheyanu', 2),
    new Prayer(3, 'Nissim', 3)
  ];


  constructor(private httpClient: HttpClient ) {
    console.log('Initializing Prayers');

    this.httpClient.get<Prayer[]>('http://localhost:55199/api/prayers')
      .subscribe(
        prs => {
          this.prayers.length = 0;
          prs.forEach(prayer => {
            this.prayers.push(prayer);
          });
        },
        err => {
          console.log('Error requesting prayer data');
        }
      );

  }

  getPrayers() {
      return this.prayers;
  }
}
