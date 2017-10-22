import { Observable } from 'rxjs/Rx';
// import { SelectDialogComponent } from './select-dialog.component';
// import { MdDialogRef, MdDialog, MdDialogConfig, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class SelectDialogService {
  // constructor(private dialog: MdDialog) {}
  /*
  constructor(private dialog: MatDialog) {}
  public confirm(title: string, stuff: { name: string, value: any }[]): Observable<number> {
    let dialogRef: MdDialogRef<SelectDialogComponent>;
    dialogRef = this.dialog.open(SelectDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.choices = stuff;
    return dialogRef.afterClosed();
  }
  */
}
