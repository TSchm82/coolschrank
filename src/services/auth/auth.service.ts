import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: string | null;
  public password: string | null;

  public getKey() {
    return btoa(`${this.user}:${this.password}`);
  }

  public isAuthenticated() {
    return !!this.user && !!this.password;
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
