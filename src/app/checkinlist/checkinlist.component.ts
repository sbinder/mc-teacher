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

  timers = new Map<number, any>();

  constructor(private changeDetector: ChangeDetectorRef, private hub: Hub,
    private studentService: StudentsService) { }

  lastdate: string;

  slist = new Array<Student>();

  ngOnInit() {
    const my = this;
    console.log('Initializing Checkin Broadcast function');
    this.hub.ClassHub.client.broadcastCheckin = function (stid, status) {
      console.log('Checkin:', stid, status);
//      if (status) {
//        my.setStatus(stid, 'present');
//      } else {
//        my.setStatus(stid, '');
//      }
//      my.changeDetector.detectChanges();
    };

    this.studentService.allStudentRequest().subscribe(x => {
      console.log('Initializing Checkin List');
      my.slist.length = 0;
      x.forEach( s => {
        my.slist.push(s);
      })
      my.sortslist();
    });
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
    this.slist.forEach(element => {
      if (element.stid === id) {
        element.present = !element.present;
//        this.sendMessage(id, element.present);
        if (!this.clearTimer(id)) {
          // invoke 2 second debounce delay
          this.timers.set(id, setTimeout(() => {
            this.SendNotification(id, element.present);
          } , 2000));
        }
        console.log(this.timers);
      }

    });
//    console.log('dispatching click', this.slist);
//    switch (this.getStatus(id)) {
//      case 'present':
//        this.setStatus(id, '');  // preemptively
//        this.sendMessage(id, false);
//        break;
//      default:
//        this.setStatus(id, 'sent');
//        this.sendMessage(id, true);
//    }
//    console.log('click result', this.slist);
  }

  clearTimer(id: number ) {
    if (this.timers.get(id)) {
      clearTimeout(this.timers.get(id));
      this.timers.delete(id);
      return true;
    } else {
      return false;
    }
  }

  SendNotification(id: number, present: boolean) {
    this.sendMessage(id, present);
    // alert('Got a POP from ' + id);
    this.timers.delete(id);
    // console.log(this.timers);
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
        console.log('setting ' + id + ' to ' + newstat);
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
