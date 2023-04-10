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

  private readonly apiBasePath = environment.API_BASE_PATH + 'crm/users/';

  public get(data: any = {}): Observable<any> {
    const URL = this.apiBasePath;
    return this.http.post(URL, data);
  }

  public getShort(): Observable<any> {
    const URL = this.apiBasePath + 'short';
    return this.http.get(URL);
  }

  public getOne(id: number): Observable<any> {
    const URL = this.apiBasePath + id;
    return this.http.get(URL);
  }

  public create(data: any): Observable<any> {
    const URL = this.apiBasePath + 'create';
    return this.http.post(URL, data);
  }

  public update(id: number, data: any): Observable<any> {
    const URL = this.apiBasePath + 'update/' + id;
    return this.http.post(URL, data);
  }

  public ban(id: number): Observable<any> {
    const URL = this.apiBasePath + 'ban/' + id;
    return this.http.post(URL, {});
  }
}
