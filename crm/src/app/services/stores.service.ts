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

  public get(): Observable<any> {
    const URL = this.apiBasePath + 'crm/stores';

    return this.http.get(URL);
  }
}
