import { Component, EventEmitter, Input, Output } from '@angular/core';

const ITEMSPERPAGE = 4;

@Component({
  selector: 'components-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {

  @Input() public inventoryLength: number;

  @Input() public page: number;

  @Output() public pageChange = new EventEmitter<number>();

  public get pages() {
    if (!this.inventoryLength) {
      return [1];
    }

    return Array.from({ length: this.calculateMaxPages() }, (_, i) => i + 1);
  }

  public selectPage(modificator: number) {
    if (this.isDisabled(modificator)) {
      return;
    }

    this.page = this.page + modificator;
    this.pageChange.emit(this.page);
  }

  public isDisabled(modificator: number) {
    return (this.page + modificator < 1) || (this.page + modificator > this.calculateMaxPages());
  }

  public calculateMaxPages() {
    return Math.ceil(this.inventoryLength / ITEMSPERPAGE);
  }

}
