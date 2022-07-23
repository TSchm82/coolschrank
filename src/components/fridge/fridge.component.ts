import { Component, OnInit } from '@angular/core';
import { Fridge } from 'src/models/fridge.model';
import { ApiService } from 'src/services/api/api.service';
import { AuthService } from 'src/services/auth/auth.service';
import { SettingsService } from 'src/services/settings/settings.service';

export const ITEMSPERPAGE = 4;

@Component({
  selector: 'components-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {

  public fridge: Fridge;

  public selectedItemId: number;

  public page = 1;

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
      this.read(id);

      return;
    }

    this.create(authkey);
  }

  public read(id: string) {
    this.apiService.getFridge<Fridge>(id).subscribe(this.updateFridge)
  }

  public create(authkey: string) {
    this.apiService.createFridge<Fridge>().subscribe(fridge => {
      this.updateFridge(fridge);

      this.settingsService.saveSettings(authkey, fridge.id);
    });
  }

  public updateFridge = (fridge: Fridge) => this.fridge = fridge;

  public selectItem(id: number) {
    this.selectedItemId = id;
  }

  public getItemPage(page: number) {
    const start = (page - 1) * ITEMSPERPAGE;
    const end = page * ITEMSPERPAGE;

    return this.fridge.inventory.slice(start, end);
  }

}
