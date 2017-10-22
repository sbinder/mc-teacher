import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Parent } from '../../models/parent';
import { element } from 'protractor';
import { MatDialog } from '@angular/material';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css'],
  providers: []
})
export class EditParentComponent implements OnInit {

  parent: Parent = null;

  plist: Parent[];
  lname: string;

  constructor(private http: HttpClient, private dialog: MatDialog) { }
  ngOnInit() {
  }

  createParent() {
    this.parent = new Parent();
    this.parent.pid = 0;
  }

  findParent() {
    const my = this;
    if (this.lname.length === 0) { return; }
    this.http.get<Parent[]>(environment.href + 'parent?namepart=' + this.lname)
    .subscribe(res => {
      my.plist = res.slice();
      if (my.plist.length === 1) {
        this.parent = my.plist[0];
        return;
      }
      const pp = new Array<{ name: string, value: any }>();
      this.plist.forEach(element => {
        let name1 = element.title1;
        name1 += name1.length > 0 ? ' ' : '';
        name1 += element.fname1.length > 0 ? element.fname1 + ' ' : '';
        if (element.lname2 !== element.lname1) {
          name1 += element.lname1.length > 0 ?  element.lname1 + ' ' : '';
        }
        if (element.fname2.length > 0) {
          name1 += ' & ' + (element.title2.length > 0 ? element.title2 + ' ' : '');
          name1 += element.fname2;
        }
        name1 += ' ' + element.lname2;

        pp.push({ name: name1, value: element.pid });
      });
      const dialogRef = this.dialog.open(SelectDialogComponent,
      { data: {title: 'Select Parent', picklist: pp} });

      dialogRef.afterClosed().subscribe(pid => {
        if (pid !== undefined) {
          this.plist.forEach(element => {
            if (element.pid === pid) {
              this.parent = element;
            }
          });
        }
      });

/*
      this.dialog.confirm('Select Parent', pp)
      .subscribe(pid => {
        if (pid !== undefined) {
          this.plist.forEach(element => {
            if (element.pid === pid) {
              this.parent = element;
            }
          });
        }

      });
      */
    });
  }

  saveForm() {
    this.http.put(environment.href + 'parent', this.parent)
    .subscribe(res => {
      this.resetForm();
    }, err => {
      alert(err);
    });

  }

  resetForm() {
    this.lname = '';
    this.parent = null;
  }
}
