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

  prayerSelected(event: Prayer) {
    console.log ('Praying ' + event.TaskName );
    this.showstudents = false;
    console.log('Showing Students: ' + this.showstudents);
  }
}
