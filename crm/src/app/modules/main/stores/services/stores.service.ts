import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class StoresService {
  constructor(protected http: HttpClient) {}

  private readonly apiBasePath = environment.API_BASE_PATH + 'crm/stores/';

  public get(data?: any): Observable<any> {
    const url = this.apiBasePath;
    return this.http.post(url, data);
  }

  public getShort(): Observable<any> {
    const url = this.apiBasePath + 'short';
    return this.http.get(url);
  }

  public getOne(id: number): Observable<any> {
    const url = this.apiBasePath + id;
    return this.http.get(url);
  }

  public create(data: any): Observable<any> {
    const url = this.apiBasePath + 'create';
    return this.http.post(url, data);
  }

  public update(storeID: number, data: any): Observable<any> {
    const url = this.apiBasePath + 'update/' + storeID;
    return this.http.post(url, data);
  }

  public delete(storeID: number): Observable<any> {
    const url = this.apiBasePath + storeID;
    return this.http.delete(url);
  }
}
