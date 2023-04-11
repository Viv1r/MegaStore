import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, protected router: Router) {
    this.authService.errorEmitter.subscribe(error => {
      this.error = error;
    })
  }

  error?: string;

  readonly loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
    if (this.authService.user.loggedIn) {
      this.router.navigate(['']);
    }
  }

  login(): void {
    this.error = undefined;
    this.authService.login(this.loginForm.value);
  }

}
