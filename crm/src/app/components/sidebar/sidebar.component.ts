import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
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
