import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { Fridge } from 'src/models/fridge.model';
import { SettingsService } from 'src/settings-service/settings.service';
import { FetchDataService } from '../fetch-data/fetch-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fridge';

  public fridge: Fridge;

  constructor(
    private fetchDataService: FetchDataService,
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
      this.fetchDataService.getFridge<Fridge>(id).subscribe(this.updateFridge)

      console.log(id)

      return;
    }

    this.fetchDataService.createFridge<Fridge>().subscribe(fridge => {
      this.updateFridge(fridge);

      this.settingsService.saveSettings(authkey, this.fridge.id);
    });
  }

  public updateFridge = (fridge: Fridge) => this.fridge = fridge;

  public add() {
    const item = {
      name: `test ${this.fridge.inventory.length}`,
      target: 0.5
    };

    this.fetchDataService.addItem(this.fridge.id, item).subscribe(() => this.fridge.inventory.push(item));
  }

}
