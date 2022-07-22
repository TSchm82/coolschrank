import { Component, OnInit } from '@angular/core';

import { Fridge } from 'src/models/fridge.model';

import { ApiService } from 'src/services/api/api.service';
import { AuthService } from 'src/services/auth/auth.service';
import { SettingsService } from 'src/services/settings/settings.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Fridge';

  public fridge: Fridge;

  public selectedItemId: number;

  public page = 1;

  public get pages() {
    if (!this.fridge) {
      return [1];
    }

    const pageCounter = Math.round(this.fridge.inventory.length / 6)

    return Array.from({ length: pageCounter }, (_, i) => i + 1);
  }

  constructor(
    private apiService: ApiService,
    private settingsService: SettingsService,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.initializeFridge();
  }

  public async initializeFridge() {
    const authkey = this.authService.getKey();
    const id = this.settingsService.getSettings(authkey);

    if (id) {
      this.apiService
        .getFridge<Fridge>(id)
        .subscribe(this.updateFridge)

      return;
    }

    this.apiService.createFridge<Fridge>().subscribe(fridge => {
      this.updateFridge(fridge);

      this.settingsService.saveSettings(authkey, this.fridge.id);
    });
  }

  public updateFridge = (fridge: Fridge) => this.fridge = fridge;

  public selectItem(id: number) {
    this.selectedItemId = id;
  }

  public getItemPage(page: number) {
    const start = (page - 1) * 6;
    const end = page * 6;

    return this.fridge.inventory.slice(start, end);
  }

  public selectPage(index: number) {
    const test = document.querySelectorAll('li.page-item')

    console.log(test)
  }

}
