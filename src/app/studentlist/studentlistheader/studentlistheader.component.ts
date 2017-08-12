import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';



@Component({
  selector: 'app-studentlistheader',
  templateUrl: './studentlistheader.component.html',
  styleUrls: ['./studentlistheader.component.css']
})
export class StudentlistheaderComponent implements OnInit {

//  groupSelected = [false, false, false, false, false];
  @Input() groupSelected: [boolean];
  @Output() GroupEvent = new EventEmitter<{group: number, selected: boolean}>();
  constructor() { }
  getClass(btn: number) {
    return this.groupSelected[btn] ?  'btn btn-primary' : 'btn btn-default';
  }

  bclick(event) {
    const num = +event.target.value;
    if (num === 4) {
      let i = 0;
      for (; i < 4; i++) {
        this.groupSelected[i] = false;
      }
    }
    this.groupSelected[num] = ! this.groupSelected[num];
    this.GroupEvent.emit({group: num, selected: this.groupSelected[num]});
  }

  ngOnInit() {
  }
}
