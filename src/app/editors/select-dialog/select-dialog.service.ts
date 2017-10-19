import { Observable } from 'rxjs/Rx';
import { SelectDialogComponent } from './select-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class SelectDialogService {
  constructor(private dialog: MdDialog) {}
  public confirm(title: string, stuff: string[]): Observable<boolean> {
    let dialogRef: MdDialogRef<SelectDialogComponent>;
    dialogRef = this.dialog.open(SelectDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.choices = stuff;
    return dialogRef.afterClosed();
  }
}
