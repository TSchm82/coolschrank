import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username = 'username';
  private password = 'password';
  private encodedString = btoa(`${this.username}:${this.password}`);

  constructor() { }

  public getKey() {
    return this.encodedString;
  }
}
