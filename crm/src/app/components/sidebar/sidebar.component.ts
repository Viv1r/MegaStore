import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    CommonModule,
    RouterModule
  ],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(protected authService: AuthService) {}

  active = false;
  user = this.authService.user;

  logout() {
    this.authService.logout();
  }
}
