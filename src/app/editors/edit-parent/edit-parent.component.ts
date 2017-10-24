import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Parent } from '../../models/parent';
import { element } from 'protractor';
import { MatDialog } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { StudentsService } from '../../services/students.service';
import { Router } from '@angular/router';
import { Phone } from '../../models/phone';

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css'],
  providers: []
})
export class EditParentComponent implements OnInit {
  parent: Parent = null;

  plist: Parent[];
  phoneList: Phone[] = [];
  lname: string;
  closeResult: string;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private studentService: StudentsService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    if (this.studentService.workingStudent !== null) {
      if (this.studentService.workingStudent.parent === undefined ||
          this.studentService.workingStudent.parent === 0) {
        return;
      }
      this.loadParent();
    }
  }

  createParent() {
    this.parent = new Parent();
    this.parent.pid = 0;
  }

  findParent() {
    const my = this;
    if (this.lname.length === 0) {
      return;
    }
    this.http
      .get<Parent[]>(environment.href + 'parent?namepart=' + this.lname)
      .subscribe(res => {
        my.plist = res.slice();
        if (my.plist.length === 1) {
          this.parent = my.plist[0];
          this.loadPhones(this.parent.pid);
          return;
        }
        const pp = new Array<{ name: string; value: any }>();
        this.plist.forEach(element => {
          const pname = this.studentService.makeParentName(element);
          pp.push({ name: pname, value: element.pid });
        });
        const dialogRef = this.dialog.open(SelectDialogComponent, {
          data: { title: 'Select Parent', picklist: pp }
        });

        dialogRef.afterClosed().subscribe(pid => {
          if (pid !== undefined) {
            this.plist.forEach(element => {
              if (element.pid === pid) {
                this.parent = element;
                this.loadPhones(this.parent.pid);
              }
            });
          }
        });
      });
  }

  cancelClick() {
    if (this.studentService.workingStudent != null) {
      this.router.navigate(['/student']);
    }
    this.resetForm();
  }

  saveForm() {
    this.http.put<Parent>(environment.href + 'parent', this.parent).subscribe(
      res => {
        if (this.studentService.workingStudent != null) {
          console.log('edited/created', res);
          this.studentService.workingStudent.parent = res.pid;
          this.router.navigate(['/student']);
        }
        this.resetForm();
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm() {
    this.lname = '';
    this.parent = null;
  }

  loadParent() {
    const my = this;
    this.http
    .get<Parent>(
      environment.href + 'parent/' + this.studentService.workingStudent.parent
    )
    .subscribe(res => {
      my.parent = res;
      my.loadPhones(my.parent.pid);
    });
  }

  loadPhones(pid: number) {
    this.http.get<Phone[]>(environment.href + 'phone/' + pid)
    .subscribe( p => {
      this.phoneList.length = 0;
      p.forEach(n => {
        const ph = new Phone();
        ph.digits = n.digits;
        ph.label = n.label;
        this.phoneList.push(ph);
      });
    });
  }

  addNumber() {
    let empty = false;
    this.phoneList.forEach(p => {
      if (p.digits.length === 0) { empty = true; }
    });
    if (empty) { return; }
    const tel = new Phone();
    this.phoneList.push(tel);
  }

  open(content) {
    const oldPhones = new Array<Phone>();
    this.phoneList.forEach(p => {
      const pn = new Phone();
      pn.digits = p.digits;
      pn.label = p.label;
      oldPhones.push(pn);
    });
    //const oldPhones = this.phoneList.copy();
    console.log('phoneList copied.');
    this.modalService.open(content).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      this.updatePhones(oldPhones);
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.phoneList = oldPhones;
    });
  }
/*
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  */

  updatePhones(orig: Phone[]) {
    // NEEDS SOME CHECKING!
    console.log('updating phones');
    let q = this.phoneList.length;
    for (let i = 0; i < q; i++) {
      if (i < orig.length) {
        if (orig[i].digits !== this.phoneList[i].digits) {
          let s = new URLSearchParams();
          s.set('pid', '' + this.parent.pid);
          s.set('digits', orig[i].digits);
          let query = '?pid=' + this.parent.pid + '&phone='  + orig[i].digits;

          this.http.delete(environment.href + 'phone' + query )

          .subscribe(r => {
            console.log('deleted', r);
          });
          if (this.phoneList[i].digits.length > 0) {
            this.addPhone(this.phoneList[i]);
          }
        } else if (orig[i].label !== this.phoneList[i].label) {
          this.addPhone(this.phoneList[i]); // add/update
        }
      } else {
        this.addPhone(this.phoneList[i]); // add/update
      }
    }
  }
  addPhone(phone: Phone) {
    console.log('adding', phone);
    phone.pid = this.parent.pid;
    // const body = { pid: this.parent.pid, phone: phone.digits,
    //  label: phone.label };
    // this.http.put(environment.href + 'phone', body )
    this.http.put(environment.href + 'phone', phone )
    .subscribe(r => {
      console.log('added', r);
    });

  }
}
