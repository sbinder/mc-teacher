import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css']
})
export class EditParentComponent implements OnInit {

  lname: string;
  constructor() { }

  ngOnInit() {
  }

  findParent() {
    if (this.lname.length === 0) { return; }

  }
}
