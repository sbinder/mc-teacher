import { Injectable } from '@angular/core';
import { Prayer } from '../models/prayer.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PrayersService {
  private prayers = [];
//  [
//    new Prayer(1, 'Tallit Blessing', 1),
//    new Prayer(2, 'Shehecheyanu', 2),
//    new Prayer(3, 'Nissim', 3)
//  ];


  constructor(private httpClient: HttpClient ) {
    this.httpClient.get<any[]>(environment.href + 'prayers') // 'http://localhost:55199/api/prayers')
      .subscribe(
        prs => {
          this.prayers.length = 0;
          prs.forEach(prayer => {
            const px = new Prayer(prayer.taskid, prayer.description, prayer.ordinal,
            prayer.groupa, prayer.groupb, prayer.groupx, prayer.active, prayer.date);
            this.prayers.push(px);
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
