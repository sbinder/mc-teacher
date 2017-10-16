import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private http: HttpClient) { }

  public getToken() {
    return localStorage.getItem('token');
  }


  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
    this.cachedRequests.forEach( req => {
      this.http.request(req);
    });
  }

}
