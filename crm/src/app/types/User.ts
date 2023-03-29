export class User {
  name?: string;
  email?: string;
  auth_token?: string;
  loggedIn = false;

  public auth(userData: User) {
    [this.name, this.email, this.auth_token]
      = [userData.name, userData.email, userData.auth_token];
    this.loggedIn = true;
  }

  public logout() {
    this.name = this.email = this.auth_token = undefined;
    this.loggedIn = false;
  }
}
