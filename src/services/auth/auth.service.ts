import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // public user: string | null;
  // public password: string | null;

  public user: string | null = 'username';
  public password: string | null = 'password';

  constructor() { }

  public getKey() {
    return btoa(`${this.user}:${this.password}`);
  }

  public isAuthenticated() {

    return true;

    // return !!this.user && !!this.password;
  }

  public login(user: string, password: string) {
    this.user = user;
    this.password = password;
  }

  public logout() {
    this.user = null;
    this.password = null;
  }


}
