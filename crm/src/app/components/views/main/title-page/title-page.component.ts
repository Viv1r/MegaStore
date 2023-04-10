import { Component } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent {
  constructor(private authService: AuthService) {}

  user = this.authService.user;
}
