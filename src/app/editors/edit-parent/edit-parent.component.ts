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

  plist: Parent[];
  parent: Parent = new Parent();
  lname: string;
  constructor(private http: HttpClient, private dialog: SelectDialogService) { }

  ngOnInit() {
  }

  findParent() {
    const my = this;
    if (this.lname.length === 0) { return; }
    this.http.get<Parent[]>(environment.href + 'parent?namepart=' + this.lname)
    .subscribe(res =>{
      my.plist = res.slice();
      console.log('plist:', my.plist);
      const pp = new Array<string>();
      this.plist.forEach(element => {
        pp.push(element.lname1 + ', ' + element.fname1);
      });
      this.dialog.confirm('Select Parent', pp)
      .subscribe(dres => { console.log('Dialog says', dres); });


      this.dlg();
    });
  }

  dlg() {

  }

}
