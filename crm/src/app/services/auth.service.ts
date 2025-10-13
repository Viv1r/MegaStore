import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {UserResponseData} from "../models/user-response-data";
import {firstValueFrom} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    readonly user = new User();
    readonly errorEmitter = new EventEmitter<string>();

    private readonly apiBasePath = environment.API_BASE_PATH;

    constructor(private http: HttpClient, private router: Router) {}

    async tokenAuth(): Promise<boolean> {
        const url = this.apiBasePath + 'token-auth';

        const data = await this.http.post(url, {}).toPromise();

        const user = (data as { user?: UserResponseData }).user;
        if (user) {
            this.user.auth(user);
            return true;
        }
        return false;
    }

    public async login(data: any): Promise<void> {
        if (!(data.email && data.password)) {
            this.errorEmitter.emit('Please fill all the fields!');
            return;
        }

        const URL = this.apiBasePath + 'login';

        const response = await firstValueFrom(
            this.http.post<any>(URL, data)
        );

        if (response?.user) {
            this.user.auth(response.user);
            this.router.navigate(['']);
        } else if (response.statusMessage) {
            this.errorEmitter.emit(response.statusMessage);
        }
    }

    public async register(data: any): Promise<void> {
        if (!(data.email && data.password && data.confirmPassword && data.name)) {
            this.errorEmitter.emit('All fields are required!');
            return;
        }

        if (data.password !== data.confirmPassword) {
            this.errorEmitter.emit('Passwords should match!');
            return;
        }

        delete data.confirmPassword;

        const url = this.apiBasePath + 'register';

        const response = await firstValueFrom(
            this.http.post<any>(url, data)
        );

        if (response.user) {
            this.user.auth(response.user);
            this.router.navigate(['']);
            return;
        }
        if (response.statusMessage) {
            this.errorEmitter.emit(response.statusMessage);
        }
    }

    public async logout(): Promise<void> {
        const url = this.apiBasePath + 'logout';

        const response = await firstValueFrom(
            this.http.post<any>(url, {})
        );

        if (response.statusCode === 'ok') {
            this.user.logout();
            this.router.navigate(['login']);
        }
    }
}
