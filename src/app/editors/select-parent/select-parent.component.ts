import { Component, OnInit } from '@angular/core';
import { Parent } from '../../models/parent';

@Component({
  selector: 'app-select-parent',
  templateUrl: './select-parent.component.html',
  styleUrls: ['./select-parent.component.css']
})
export class SelectParentComponent implements OnInit {
  plist: Parent[];

  constructor() { }

  ngOnInit() {
  }

}
