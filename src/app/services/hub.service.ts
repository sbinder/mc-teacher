import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


declare var jquery: any;
declare var $: any;

@Injectable()
export class Hub {

  ClassHub: any;

  constructor(private http: HttpClient) {
    // Declare a proxy to reference the hub.
    $.connection.hub.url = environment.signalr;
    // $.connection.hub.url = 'http://localhost:55199/signalr'; // TESTING ONLY
    this.ClassHub = $.connection.classHub;
    if (this.ClassHub === undefined) {
      alert('Error contacting server. Is Checkin running?');
    } else {
      $.connection.hub.start()
        .done(() => {
          this.ClassHub.server.joinGroup(1);
          console.log('Connection to hub established.')
        });
    }
  }
}
