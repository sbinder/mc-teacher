import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prayersheet',
  templateUrl: './prayersheet.component.html',
  styleUrls: ['./prayersheet.component.css']
})
export class PrayersheetComponent implements OnInit {

  constructor() { }

  @Output() goBack = new EventEmitter();

  ngOnInit() {
  }
  returnClicked() {
    this.goBack.emit();
  }
}
