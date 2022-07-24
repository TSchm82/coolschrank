import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Item } from 'src/models/item.model';
import { ApiService } from 'src/services/api/api.service';

@Component({
  selector: 'components-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnChanges {

  @Input() public selectedItemId: number;

  @Input() public fridgeId: string;

  @ViewChild('modifyControl') public modifyControl: NgControl;

  public selectedItem: Item;

  public modifyValue: number = 1;

  constructor(public apiService: ApiService) { }

  public get maxValue() {
    const selectedItem = this.selectedItem;
    if (!selectedItem) {
      return 0;
    }

    return (selectedItem.target || 0) - (selectedItem.actual || 0);
  }

  public get minValue() {
    const selectedItem = this.selectedItem;
    if (!selectedItem || !selectedItem.actual) {
      return 0;
    }

    return - selectedItem.actual;
  }

  public ngOnChanges(): void {
    requestAnimationFrame(() => this.selectedItemId && this.getSelectedItem(this.selectedItemId));
  }

  private getSelectedItem(itemId: number) {
    this.apiService.getItem(this.fridgeId, itemId).subscribe(this.setItem);
  }

  public updateItem() {
    const changeModel = { id: this.selectedItem.id, actual: this.modifyValue };
    this.modifyValue = 0;

    this.apiService.updateItem(this.fridgeId, changeModel).subscribe(this.setItem);
  }

  public setItem = (item: Item) => this.selectedItem = item;

  public getValidationError(max: number, min: number) {
    const modifyValue = this.modifyValue;

    if (modifyValue > max) {
      return 'Too high'
    }

    if (modifyValue < min) {
      return 'Too low'
    }

    return '';
  }

  public getEntries() {
    return Object.entries(this.selectedItem);
  }

}
