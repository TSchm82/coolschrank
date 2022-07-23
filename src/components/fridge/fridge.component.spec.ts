import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { FRIDGEDUMMY } from 'src/Dummies/fridge-dummy';
import { ITEMDUMMY } from 'src/Dummies/item-dummy';

import { FridgeComponent, ITEMSPERPAGE } from './fridge.component';

describe('FridgeComponent', () => {
  let component: FridgeComponent;
  let fixture: ComponentFixture<FridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [FridgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FridgeComponent);
    component = fixture.componentInstance;
    component.fridge = FRIDGEDUMMY;
    fixture.detectChanges();

    for (let i = 0; i < 20; i++) {
      component.fridge.inventory.push(ITEMDUMMY);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set item id', () => {
    component.selectItem(5);

    expect(component.selectedItemId).toBe(5);
  });

  it('should update fridge', () => {
    component.updateFridge(FRIDGEDUMMY);

    expect(component.fridge).toBe(FRIDGEDUMMY);
  });

  it('should get x items per page', () => {
    component.fridge = FRIDGEDUMMY;

    expect(component.getItemPage(3).length).toBe(ITEMSPERPAGE);
  });


  it('should have correct start index ', () => {
    component.fridge = FRIDGEDUMMY;

    const startIndex = 2 * ITEMSPERPAGE;

    expect(component.getItemPage(3)[0]).toBe(component.fridge.inventory[startIndex]);
  });

  it('should have correct end index ', () => {
    component.fridge = FRIDGEDUMMY;

    const endIndex = 3 * ITEMSPERPAGE;

    expect(component.getItemPage(3)[0]).toBe(component.fridge.inventory[endIndex]);
  });

});



// public updateFridge = (fridge: Fridge) => this.fridge = fridge;


// public getItemPage(page: number) {
//   const start = (page - 1) * ITEMSPERPAGE;
//   const end = page * ITEMSPERPAGE;

//   return this.fridge.inventory.slice(start, end);
// }