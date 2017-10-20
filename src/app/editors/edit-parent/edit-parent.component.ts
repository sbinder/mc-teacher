import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Parent } from '../../models/parent';
import { MdDialog } from '@angular/material';
import { SelectDialogService } from '../select-dialog/select-dialog.service';
import { element } from 'protractor';

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css'],
  providers: [SelectDialogService]
})
export class EditParentComponent implements OnInit {

  parent: Parent = null;

  plist: Parent[];
  lname: string;

    constructor(private http: HttpClient, private dialog: SelectDialogService) { }

  ngOnInit() {
  }

  findParent() {
    const my = this;
    if (this.lname.length === 0) { return; }
    this.http.get<Parent[]>(environment.href + 'parent?namepart=' + this.lname)
    .subscribe(res => {
      my.plist = res.slice();
      console.log('plist:', my.plist);
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
    });
  }
  resetForm() {
    this.lname = '';
    this.parent = null;
//    this.el.nativeElement.focus();
//    this._renderer.invokeElementMethod(
//      this.input1ElementRef.nativeElement, 'focus', []);
  }
}
