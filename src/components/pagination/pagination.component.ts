import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

    const pageCounter = Math.round(this.inventoryLength / ITEMSPERPAGE)

    return Array.from({ length: pageCounter }, (_, i) => i + 1);
  }

  public selectPage(modificator: number) {
    if (this.isDisabled(modificator)) {
      return;
    }

    this.page = this.page + modificator;
    this.pageChange.emit(this.page);
  }

  public isDisabled(modificator: number) {
    const maxPages = Math.round(this.inventoryLength / ITEMSPERPAGE)

    return (this.page + modificator < 1) || (this.page + modificator > maxPages);
  }

}
