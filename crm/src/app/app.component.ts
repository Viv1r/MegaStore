import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(protected authService: AuthService, protected router: Router) {}

  loginCheckDone = false;

  private async loginCheck(): Promise<void> {
    const check = await this.authService.tokenAuth();
    if (!check && this.router.url != '/register') {
      await this.router.navigate(['login']);
    }
    this.loginCheckDone = true;
  }

  async ngOnInit() {
    await this.loginCheck();
  }
}
