import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Prayer } from '../models/prayer.model';

@Component({
  selector: 'app-prayersheet',
  templateUrl: './prayersheet.component.html',
  styleUrls: ['./prayersheet.component.css']
})
export class PrayersheetComponent implements OnInit {

  constructor() { }

  @Input() currentPrayer: Prayer;
  @Output() goBack = new EventEmitter();

  ngOnInit() {
  }
  returnClicked() {
    this.goBack.emit();
  }
}
