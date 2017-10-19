import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/teacher.model';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // public orgid = '';
  // public un = '';
  // public pw = '';
  public user = {'orgid': '', 'un': '', 'pw': ''};

  constructor(private http: HttpClient, private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  submitClick() {
    // console.log('Submitting:', this.user.orgid, this.user.un, this.user.pw);
    if (this.user.orgid.length === 0 || this.user.un.length === 0 ||
      this.user.pw.length === 0) { return; }
    const params = new HttpParams().set('orgid', this.user.orgid)
    .set('un', this.user.un).set('pw', this.user.pw);

    this.http.get<{key: string, value: string}>(environment.href + 'token', { params }).subscribe(
    res => {
      // console.log('recd token', res);
      const t = res['token'];
      // console.log('saving', t);
      this.auth.updateToken(t);
      this.router.navigate(['/']);
    },
    err => {
      console.log('Auth Error', err);
    }
    );
;
  }
}
