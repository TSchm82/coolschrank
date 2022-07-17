import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  // private apiServerori = 'https://innovations.rola.com/build/rola/coolschrank/ongoing/application';
  private apiServer = 'http://localhost:8010/proxy';

  constructor(private http: HttpClient) { }

  public createFridge<T>(): Observable<T> {
    return this.http.post<T>(this.apiServer + '/fridge', [])
  }

  public getFridge<T>(id: string): Observable<T> {
    return this.http.get<T>(this.apiServer + '/fridge/' + id);
  }

  public addItem(id: string, item: Item) {
    return this.http.post(this.apiServer + '/fridge/' + id + '/item', item)
  }

  public getContent(id: string) {
    return this.http.get(this.apiServer + '/fridge/' + id);
  }

}
