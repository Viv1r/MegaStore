import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  readonly adminRoutes = ['/categories', '/users'];
  readonly user = this.authService.user;

  validateRoute(): void {
    if (this.adminRoutes.includes(this.router.url)) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    if (!this.user.isAdmin) {
      this.validateRoute();
    }
  }

}
