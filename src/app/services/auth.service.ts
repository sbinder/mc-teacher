import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/testing';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private injector: Injector, private router: Router) { }

  public getToken() {
    return localStorage.getItem('token');
  }

  public updateToken(token: string) {
     console.log('storing token:', token);
    localStorage.setItem('token', token);
    this.retryFailedRequests();
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
    const http = this.injector.get(HttpClient);
    this.cachedRequests.forEach( req => {
      console.log('Retrying request', req);
      http.request(req);
    });
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
