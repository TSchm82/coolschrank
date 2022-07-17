import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from 'src/models/item.model';
import { ApiService } from 'src/services/api/api.service';

@Component({
  selector: 'components-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnChanges {

  @Input() public selectedItemId: number;

  @Input() public fridgeId: string;

  public selectedItem: Item;

  public modifyValue: number = 0;

  public get maxValue() {
    const selectedItem = this.selectedItem;
    if (!selectedItem || !selectedItem.actual || !selectedItem.target) {
      return 0;
    }

    return selectedItem.target - selectedItem.actual;
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

  private setItem = (item: Item) => this.selectedItem = item;

}
