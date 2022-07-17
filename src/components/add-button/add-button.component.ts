import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Fridge } from 'src/models/fridge.model';
import { Item } from 'src/models/item.model';
import { ApiService } from 'src/services/api/api.service';

@Component({
  selector: 'components-add-button',
  templateUrl: './add-button.component.html',
})
export class AddbuttonComponent implements OnInit {

  @Input() public fridge: Fridge;

  @Output() public itemAdded = new EventEmitter<Item>();

  public newItem: Item = this.newItemPristine();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  public addItem() {
    this.apiService.addItem(this.fridge.id, this.newItem).subscribe(newItem => {
      this.itemAdded.emit(newItem);
      this.newItem = this.newItemPristine();
    })
  }

  private newItemPristine() {
    return {
      name: null,
      target: null
    };
  }

}
