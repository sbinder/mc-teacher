import { Component, OnInit } from '@angular/core';
import { log } from "util";

@Component({
  selector: 'app-studentlistheader',
  templateUrl: './studentlistheader.component.html',
  styleUrls: ['./studentlistheader.component.css']
})
export class StudentlistheaderComponent implements OnInit {

  groupA = false;
  groupB = false;
  grcouAB = false;
  groupN = false;

  constructor() { }

  getClass(btn: string) {
    let bn = false;
    switch(btn) {
      case 'A':
        bn = this.groupA;
        break;
      case 'B':
        bn = this.groupB;
    }
    if (bn) {
      return 'btn btn-primary';
    } else {
      return 'btn btn-default';
    }
  }

  bclick(event) {
    console.log(event.target.value);
    switch(event.target.value) {
      case 'A':
        this.groupA = !this.groupA;
        break;
      case 'B':
        this.groupB = !this.groupB;
    }
  }

  ngOnInit() {
  }
}
