import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private readonly apiBasePath = environment.API_BASE_PATH;
  public user = new User();

  public login(email?: string, password?: string): void {
    if (!email || !password) return;

    const URL = this.apiBasePath + 'login';
    const body = {
      email: email,
      password: password
    };

    this.http.post(URL, body)
      .subscribe(data => {
        const user = (data as { user?: User }).user;
        if (user) {
          this.user.auth(user);
        }
      })
  }
}
