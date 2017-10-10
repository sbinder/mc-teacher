import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Href } from './href.service';



declare var jquery: any;
declare var $: any;

@Injectable()
export class Hub {

  ClassHub: any;

  constructor(private http: HttpClient) {
    // Declare a proxy to reference the hub.
    $.connection.hub.url = 'http://localhost:55199/signalr'; // TESTING ONLY
    this.ClassHub = $.connection.classHub;

    $.connection.hub.start()
    .done(() => {
      this.ClassHub.server.joinGroup(1);
    });
  }
}
