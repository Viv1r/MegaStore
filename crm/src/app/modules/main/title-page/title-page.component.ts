import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";

@Component({
    selector: 'app-title-page',
    templateUrl: './title-page.component.html',
    styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {

    user: User;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.user = this.authService.user;
    }

}
