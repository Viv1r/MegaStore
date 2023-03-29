import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public authService: AuthService) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  login() {
    const {email, password} = this.loginForm.value;
    this.authService.login(email ?? '', password ?? '');
  }

}
