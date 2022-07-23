import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { AddbuttonComponent } from './add-button/add-button.component';
import { FormsModule } from '@angular/forms';
import { FridgeComponent } from './fridge/fridge.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    ItemComponent,
    AddbuttonComponent,
    FridgeComponent,
    PaginationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FridgeComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
