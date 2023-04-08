import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  constructor(protected http: HttpClient, protected authService: AuthService) {}

  private readonly apiBasePath = environment.API_BASE_PATH;
  private readonly user = this.authService.user;

  public getShort(): Observable<any> {
    const URL = this.apiBasePath + 'crm/stores/short';
    return this.http.get(URL);
  }

  public get(data?: any): Observable<any> {
    const URL = this.apiBasePath + 'crm/stores';
    return this.http.post(URL, data);
  }

  public getOne(id: number): Observable<any> {
    const URL = this.apiBasePath + 'crm/stores/' + id;
    return this.http.get(URL);
  }

  public create(data: any): Observable<any> {
    const URL = this.apiBasePath + 'crm/stores/create';
    return this.http.post(URL, data);
  }

  public update(storeID: number, data: any): Observable<any> {
    const URL = this.apiBasePath + 'crm/stores/' + storeID;
    return this.http.post(URL, data);
  }
}
