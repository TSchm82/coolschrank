import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private apiServer = '//innovations.rola.com/build/rola/coolschrank/ongoing/application';
  private username = 'test';
  private password = 'test';
  private encodedString = btoa(`${this.username}:${this.password}`);

  constructor(private httpClient: HttpClient) { }

  public createFridge() {
    const httpOptions = {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', `Basic ${this.encodedString}`)
    };

    const stringh = `Basic ${this.encodedString}`;

    const headers = new HttpHeaders()
      // .append('Content-Type', 'application/json')
      .set('Authorization', `Basic ${this.encodedString}`)

    return this.httpClient.post(this.apiServer + '/fridge', httpOptions)
  }

}
