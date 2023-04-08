import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(protected http: HttpClient, protected authService: AuthService) {}

  private readonly apiBasePath = environment.API_BASE_PATH;

  public get(data: any = {}): Observable<any> {
    const URL = this.apiBasePath + 'crm/users';
    return this.http.post(URL, data);
  }

  public getOne(id: number): Observable<any> {
    const URL = this.apiBasePath + 'crm/users/' + id;
    return this.http.get(URL);
  }

  public create(data: any): Observable<any> {
    const URL = this.apiBasePath + 'crm/users/create';
    return this.http.post(URL, data);
  }

  public update(id: number, data: any): Observable<any> {
    const URL = this.apiBasePath + 'crm/users/update/' + id;
    return this.http.post(URL, data);
  }

  public ban(id: number): Observable<any> {
    const URL = this.apiBasePath + 'crm/users/ban/' + id;
    return this.http.post(URL, {});
  }
}
