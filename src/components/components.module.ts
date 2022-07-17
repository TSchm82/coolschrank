import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { AddbuttonComponent } from './add-button/add-button.component';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ItemComponent,
    AddbuttonComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ItemComponent,
    AddbuttonComponent,
    InputComponent
  ]
})
export class ComponentsModule { }
