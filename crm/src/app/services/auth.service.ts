import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../types/User";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private readonly apiBasePath = environment.API_BASE_PATH;
  public readonly user = new User();

  public readonly errorEmitter = new EventEmitter<string>();

  public tokenAuth(): Promise<boolean> {
    const URL = this.apiBasePath + 'token-auth';

    return new Promise(resolve => {
      this.http.post(URL, {})
        .subscribe(response => {
          const user = (response as { user?: User }).user;
          if (user) {
            this.user.auth(user);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    })
  }

  public login(data: any): void {
    if ( !(data.email && data.password) ) {
      this.errorEmitter.emit('Please fill all the fields!');
      return;
    }

    const URL = this.apiBasePath + 'login';

    this.http.post(URL, data)
      .subscribe((response: any) => {
        const user = response.user;
        if (user) {
          this.user.auth(user);
          this.router.navigate(['']);
        } else if (response.statusMessage) {
          this.errorEmitter.emit(response.statusMessage);
        }
      });
  }

  public register(data: any): void {
    if ( !(data.email && data.password && data.confirmPassword && data.name) ) {
      this.errorEmitter.emit('All fields are required!');
      return;
    }
    if (data.password !== data.confirmPassword) {
      this.errorEmitter.emit('Passwords should match!');
      return;
    }
    delete data.confirmPassword;

    const URL = this.apiBasePath + 'register';

    this.http.post(URL, data)
      .subscribe((response: any) => {
        if (response.user) {
          this.user.auth(response.user);
          this.router.navigate(['']);
        } else if (response.statusMessage) {
          this.errorEmitter.emit(response.statusMessage);
        }
      });
  }

  public logout(): void {
    const URL = this.apiBasePath + 'logout';

    this.http.post(URL, {})
      .subscribe((response: any) => {
        if (response.statusCode === 'ok') {
          this.user.logout();
          this.router.navigate(['login']);
        }
      })
  }
}
