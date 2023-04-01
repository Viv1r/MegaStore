import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.tokenAuth();
  }

  private readonly apiBasePath = environment.API_BASE_PATH;
  public readonly user = new User();

  private tokenAuth(): void {
    const URL = this.apiBasePath + 'token-auth';

    this.http.post(URL, {})
      .subscribe(response => {
        const user = (response as { user?: User }).user;
        if (user) {
          this.user.auth(user);
        }
      });
  }

  public login(data: any): void {
    if ( !(data.email && data.password) ) return;

    const URL = this.apiBasePath + 'login';

    this.http.post(URL, data)
      .subscribe(response => {
        const user = (response as { user?: User }).user;
        if (user) {
          this.user.auth(user);
        }
      });
  }

  public register(data: any): void {
    if ( !(data.email && data.password && data.confirmPassword && data.name) ) return;
    if (data.password !== data.confirmPassword) return;
    delete data.confirmPassword;

    const URL = this.apiBasePath + 'register';

    this.http.post(URL, data)
      .subscribe(response => {
        const user = (response as { user?: User }).user;
        if (user) {
          this.user.auth(user);
        }
      });
  }
}
