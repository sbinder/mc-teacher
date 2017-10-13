import { Component, OnInit } from '@angular/core';
import { ModeService } from '../../services/mode.service';



@Component({
  selector: 'app-studentlistheader',
  templateUrl: './studentlistheader.component.html',
  styleUrls: ['./studentlistheader.component.css']
})
export class StudentlistheaderComponent implements OnInit {

  buttonSelected = [false, false, false, false];
  // @Output() GroupEvent = new EventEmitter<{group: number, selected: boolean}>();

  constructor(private mode: ModeService) { }

  ngOnInit() {

      }

  getClass(btn: number) {
    return this.buttonSelected[btn] ? 'btn btn-primary' : 'btn btn-default';
  }

  bclick(event) {
    const num = +event.target.value;
    if (num === 4) {
      let i = 0;
      for (; i < 4; i++) {
        this.buttonSelected[i] = false;
      }
    }
    this.buttonSelected[num] = !this.buttonSelected[num];
    this.mode.workingGroup.next([
      this.buttonSelected[0] || this.buttonSelected[2] || this.buttonSelected[4],
      this.buttonSelected[1] || this.buttonSelected[2] || this.buttonSelected[4],
      this.buttonSelected[3] || this.buttonSelected[4]
    ]);
  }
  // this.GroupEvent.emit({group: num, selected: this.groupSelected[num]});

}



