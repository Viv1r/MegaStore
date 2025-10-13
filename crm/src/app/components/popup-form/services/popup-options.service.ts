import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class PopupOptionsService {

    constructor(protected http: HttpClient) {}

    private readonly apiBasePath = environment.API_BASE_PATH;

    public getOptions(optionsUrl: string): Observable<any> {
        return this.http.get(this.apiBasePath + optionsUrl);
    }

}
