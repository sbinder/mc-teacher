import { Component, OnInit, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-studentlistheader',
  templateUrl: './studentlistheader.component.html',
  styleUrls: ['./studentlistheader.component.css']
})
export class StudentlistheaderComponent implements OnInit {

  groupSelected = [false, false, false, false];
  @Output() GroupEvent = new EventEmitter<{group: number, selected: boolean}>();
  constructor() { }
  getClass(btn: number) {
    return this.groupSelected[btn] ?  'btn btn-primary' : 'btn btn-default';
  }

  bclick(event) {
    const num: number = event.target.value;
    this.groupSelected[num] = ! this.groupSelected[num];
    this.GroupEvent.emit({group: num, selected: this.groupSelected[num]});
  }

  ngOnInit() {
  }
}
