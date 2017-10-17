import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/testing';

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private injector: Injector) { }

  public getToken() {
    return localStorage.getItem('token');
  }


  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
    const http = this.injector.get(HttpClient);
    this.cachedRequests.forEach( req => {
      http.request(req);
    });
  }

}
