import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { element } from 'protractor';
import { Hub } from '../services/hub.service';
import { Student } from '../models/student.model';
import { StudentsService } from '../services/students.service';
import { Subscription } from 'rxjs/Subscription';


// declare var jquery: any;
// declare var $: any;

@Component({
  selector: 'app-checkinlist',
  templateUrl: './checkinlist.component.html',
  styleUrls: ['./checkinlist.component.css']
})
export class CheckinlistComponent implements OnInit {

  // students$: Subscription;

  constructor(private changeDetector: ChangeDetectorRef, private hub: Hub,
    private studentService: StudentsService) { }

  lastdate: string;

  slist = new Array<Student>();

  ngOnInit() {
    const my = this;
    this.studentService.allStudentRequest().subscribe(x => {
    // this.students$  = this.studentService.studentChange.subscribe(x => {
      // if (x.s !== 0) { return; }
      console.log('Initializing Checkin List');
      // this.slist = this.studentService.getStudents();
      my.slist.length = 0;
      x.forEach( s => {
        my.slist.push(s);
      })
      my.sortslist();
    });

    // this.slist = this.studentService.getStudents();
    // this.sortslist();
    // const my = this;
    //    $.connection.hub.url = 'http://localhost:55199/signalr'; // TESTING ONLY
    //    // Declare a proxy to reference the hub.
    //    this.ClassHub = $.connection.classHub;
    //    // Create a function that the hub can call to broadcast messages.
    //    this.ClassHub.client.broadcastCheckin = function (stid, status) {
    this.hub.ClassHub.client.broadcastCheckin = function (stid, status) {
      console.log('Checkin:', stid, status);
      if (status) {
        my.setStatus(stid, 'present');
      } else {
        my.setStatus(stid, '');
      }
      my.changeDetector.detectChanges();
    };
    //    $.connection.hub.start()
    //    .done(() => {
    //      my.ClassHub.server.joinGroup(1);
    //    });
    //    // set up initial display
    //    let pcount = 0;
    //    this.slist.forEach(element => {
    //      if (element.present) {
    //        element.c = 'present';
    //        pcount ++;
    //      }
    //    });
  }

  sendMessage(stid: number, status: boolean) {
    this.hub.ClassHub.server.checkin(1, stid, status);
  }

  checkDate(newdate) {
    if (newdate === this.lastdate) {
      return false;
    }
    this.lastdate = newdate;
    return true;
  }

  getdate(ds: string) {
    // console.log('date from server', ds);
    const d = new Date(+ds.substr(0, 4), +ds.substr(5, 2) - 1, +ds.substr(8,2));
    return d;
  }

  gotClicked(id) {
    switch (this.getStatus(id)) {
      case 'present':
        this.setStatus(id, '');  // preemptively
        this.sendMessage(id, false);
        break;
      default:
        this.setStatus(id, 'sent');
        this.sendMessage(id, true);
    }
  }

  getStatus(id): string {
    let r = '';
    this.slist.forEach(element => {
      if (id === element.stid) {
        r = element.present ? 'present' : '';
      }
    });
    return r;
  }

  setStatus(id, newstat) {
    this.slist.forEach((element, i) => {
      if (id === element.stid) {
        element.present = (newstat === 'present');
        // console.log(this.slist);
      }
    });
  }

  sortslist() {
      this.slist.sort((a, b) => {
      if (a.target < b.target) {
        return -1;
      } else if (a.target > b.target) {
        return 1;
      } else if (a.lname < b.lname) {
        return -1;
      } else if (a.lname > b.lname) {
        return 1;
      } else if (a.fname < b.fname) {
        return -1;
      } else if (a.fname > b.fname) {
        return 1;
      } else { return 0; }

    });
  }
}
