import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.css']
})
export class SelectDialogComponent implements OnInit {
  // plist: Parent[];
  title: string;
  choices: string[];

  constructor(public dialogRef: MdDialogRef<SelectDialogComponent>) {
  }

  ngOnInit() {
  }

}
