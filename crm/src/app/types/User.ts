export class User {
  name?: string;
  email?: string;
  loggedIn = false;

  public auth(userData: User) {
    [this.name, this.email]
      = [userData.name, userData.email];
    this.loggedIn = true;
  }

  public logout() {
    this.name = this.email = undefined;
    this.loggedIn = false;
  }
}
