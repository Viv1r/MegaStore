import { Component, } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(public authService: AuthService) { }

  hidePassword = true;
  hideConfirmPassword = true;

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  register(): void {
    this.authService.register(this.registerForm.value);
  }
}
