import { Component, OnInit } from '@angular/core';
import { takeUntil, Subject } from 'rxjs';

import { Fridge } from 'src/models/fridge.model';
import { Item } from 'src/models/item.model';
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

      console.log(id)

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

}
