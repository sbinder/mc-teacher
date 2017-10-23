import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Parent } from "../../models/parent";
import { element } from "protractor";
import { MatDialog } from "@angular/material";
import { SelectDialogComponent } from "../select-dialog/select-dialog.component";
import { StudentsService } from "../../services/students.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-parent",
  templateUrl: "./edit-parent.component.html",
  styleUrls: ["./edit-parent.component.css"],
  providers: []
})
export class EditParentComponent implements OnInit {
  parent: Parent = null;

  plist: Parent[];
  lname: string;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private studentService: StudentsService,
    private router: Router
  ) {}
  ngOnInit() {
    if (this.studentService.workingStudent !== null) {
      if (this.studentService.workingStudent.parent === undefined ||
          this.studentService.workingStudent.parent === 0) {
        // this.createParent();
        return;
      }
      this.loadParent()
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
      .get<Parent[]>(environment.href + "parent?namepart=" + this.lname)
      .subscribe(res => {
        my.plist = res.slice();
        if (my.plist.length === 1) {
          this.parent = my.plist[0];
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
        alert(err);
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
    });

  }
}
