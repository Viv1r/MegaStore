import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(protected http: HttpClient, protected authService: AuthService) {}

  private readonly apiBasePath = environment.API_BASE_PATH + 'crm/categories/';

  public get(): Observable<any> {
    const URL = this.apiBasePath;
    return this.http.get(URL);
  }

  public getShortList(): Observable<any> {
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

  public delete(id: number, replacementID: number): Observable<any> {
    const URL = this.apiBasePath + id;
    return this.http.delete(URL, { params: { replacement: replacementID } });
  }
}
