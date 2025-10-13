import {UserResponseData} from "./user-response-data";

export class User {
  name?: string;
  email?: string;
  isAdmin?: boolean;
  isRoot?: boolean;
  loggedIn: boolean = false;

  public auth(userData: UserResponseData) {
    [this.name, this.email, this.isAdmin, this.isRoot]
      = [userData.name, userData.email, userData.is_admin, userData.is_root];
    this.loggedIn = true;
  }

  public logout() {
    this.name = this.email = this.isAdmin = this.isRoot = undefined;
    this.loggedIn = false;
  }
}
