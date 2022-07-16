import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private apiServer = '//innovations.rola.com/build/rola/coolschrank/ongoing/application';
  private username = 'username';
  private password = 'password';
  private encodedString = btoa(`${this.username}:${this.password}`);

  constructor(private httpClient: HttpClient) { }

  public createFridge() {
    const headers = new HttpHeaders()

    return this.httpClient.post(this.apiServer + '/fridge', [])
  }

}
