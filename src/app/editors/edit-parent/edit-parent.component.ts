import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Parent } from '../../models/parent';

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css']
})
export class EditParentComponent implements OnInit {

  plist: Parent[];
  parent: Parent = new Parent();
  lname: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  findParent() {
    const my = this;
    if (this.lname.length === 0) { return; }
    this.http.get<Parent[]>(environment.href + 'parent?namepart=' + this.lname)
    .subscribe(res =>{
      my.plist = res.slice();
      console.log('plist:', my.plist);
    });
  }
}
