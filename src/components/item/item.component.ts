import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { Item } from 'src/models/item.model';
import { ApiService } from 'src/services/api/api.service';

@Component({
  selector: 'components-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnChanges {

  @Input() public selectedItemId: number;

  @Input() public fridgeId: string;

  @ViewChild('actualControl') public ngControl: NgControl;

  public selectedItem: Item;

  public modifyValue: number = 1;

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

  constructor(public apiService: ApiService) { }

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

  public getValidationError() {
    const validators = ['min', 'max'];
    const ngControl = this.ngControl;

    for (const validator of validators) {
      if (ngControl.errors && ngControl.errors[validator]) {
        return validator;
      }
    }

    return '';
  }

  public getEntries() {
    return Object.entries(this.selectedItem);
  }

}
