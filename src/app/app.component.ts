import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TokenInterceptor } from 'src/auth/auth-interceptor';
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

    this.fridge = await id && this.getFridge(id) || this.createFridgeAndStoreId(authkey);

    console.log(this.fridge);
  }

  public async createFridgeAndStoreId(key: string) {
    const fridge = await firstValueFrom(this.fetchDataService.createFridge<Fridge>())

    this.settingsService.saveSettings(key, fridge.id)

    return fridge;
  }

  public async getFridge(id: string) {
    const fridge = await firstValueFrom(this.fetchDataService.getFridge<Fridge>(id))

    return fridge;
  }

}
