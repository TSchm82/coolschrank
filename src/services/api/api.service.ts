import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiServer = 'https://innovations.rola.com/build/rola/coolschrank/ongoing/application';

  private http: HttpClient;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  public createFridge<T>(): Observable<T> {
    return this.http.post<T>(this.apiServer + '/fridge', [])
  }

  public getFridge<T>(id: string): Observable<T> {
    return this.http.get<T>(this.apiServer + '/fridge/' + id);
  }

  public addItem(id: string, item: Item) {
    return this.http.post(this.apiServer + '/fridge/' + id + '/item', item)
  }

  public getItem(id: string, itemId: number) {
    return this.http.get(this.apiServer + '/fridge/' + id + '/item/' + itemId);
  }

  public updateItem(id: string, item: Item) {
    return this.http.post(this.apiServer + '/fridge/' + id + '/item/' + item.id, item);
  }
}
