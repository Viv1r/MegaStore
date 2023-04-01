import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public authService: AuthService) { }

  hidePassword = true;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  login(): void {
    this.authService.login(this.loginForm.value);
  }

}
