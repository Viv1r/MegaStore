import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../types/User";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(protected http: HttpClient, protected authService: AuthService) {}

  private readonly apiBasePath = environment.API_BASE_PATH + 'crm/products/';

  public get(data?: any): Observable<any> {
    const URL = this.apiBasePath;

    return this.http.post(URL, data, {
      params: {
        count: data?.count ?? 100
      }
    });
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

  public delete(id: number): Observable<any> {
    const URL = this.apiBasePath + id;
    return this.http.delete(URL);
  }

  public addPicture(id: number, picture: any): Observable<any> {
    const URL = this.apiBasePath + id + '/picture';
    return this.http.post(URL, { picture: picture });
  }

}
