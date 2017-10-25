import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // isIn = false;   // store state
  // m1In = false;
  public navbarCollapsed = true;
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }
}
