export class User {
  name?: string;
  email?: string;
  isAdmin?: boolean;
  loggedIn = false;

  public auth(userData: any) {
    [this.name, this.email, this.isAdmin]
      = [userData.name, userData.email, userData.is_admin];
    this.loggedIn = true;
  }

  public logout() {
    this.name = this.email = this.isAdmin = undefined;
    this.loggedIn = false;
  }
}
