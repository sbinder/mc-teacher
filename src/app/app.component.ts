import { Component } from '@angular/core';
import { Prayer } from './models/prayer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Group Lesson Portal';
  showstudents = true;
  workingPrayer: Prayer;

  prayerSelected(event: Prayer) {
    this.workingPrayer = event;
    this.showstudents = false;
  }
}
