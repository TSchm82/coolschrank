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

  /**
   * Reference to the input element.
   */
  @ViewChild('inputRef') public inputRef: ElementRef<HTMLInputElement>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  public addItem() {
    const item = {
      name: this.inputRef.nativeElement.value,
      actual: 5
    };

    this.apiService.addItem(this.fridge.id, item).subscribe(() => this.itemAdded.emit(item))
  }

}
