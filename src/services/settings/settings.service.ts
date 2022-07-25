import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public saveSettings(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getSettings(key: string) {
    const settings = localStorage.getItem(key);

    return settings && JSON.parse(settings) || null;
  }

}
