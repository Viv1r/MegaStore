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

  private readonly apiBasePath = environment.API_BASE_PATH;
  private readonly user = this.authService.user;

  public get(data?: any): Observable<any> {
    const URL = this.apiBasePath + 'products/crm';

    const body = {
      category: data?.category ?? []
    };

    return this.http.post(URL, body, {
      headers: {
        Authorization: 'Bearer ' + this.user.auth_token
      },
      params: {
        count: data?.count ?? 100
      }
    });
  }

  public getCategories(): Observable<any> {
    const URL = this.apiBasePath + 'categories';

    return this.http.get(URL, {
      headers: {
        Authorization: 'Bearer ' + this.user.auth_token
      }
    });
  }

}
