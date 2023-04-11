import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(protected http: HttpClient) {}

  private readonly apiBasePath = environment.API_BASE_PATH + 'crm/sales/';

  public get(data?: any): Observable<any> {
    const URL = this.apiBasePath;
    return this.http.post(URL, data);
  }

  public getOne(id: number): Observable<any> {
    const URL = this.apiBasePath + id;
    return this.http.get(URL);
  }
}
