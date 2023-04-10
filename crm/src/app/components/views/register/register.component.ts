import {Component, OnInit,} from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { FormControl, FormGroup } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService, protected router: Router) {
    this.authService.errorEmitter.subscribe(error => {
      this.error = error;
    })
  }

  showPassword = true;
  showConfirmPassword = true;
  error?: string;

  readonly registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  ngOnInit(): void {
    if (this.authService.user.loggedIn) {
      this.router.navigate(['']);
    }
  }

  register(): void {
    this.error = undefined;
    this.authService.register(this.registerForm.value);
  }
}
