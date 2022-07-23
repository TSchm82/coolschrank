import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { ITEMDUMMY } from 'src/Dummies/item-dummy';

import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should overwrite selected item', () => {
    component.setItem(ITEMDUMMY);

    expect(component.selectedItem).toBe(ITEMDUMMY);
  });

  it('minValue should return o when no actual value is set', () => {
    component.selectedItem = ITEMDUMMY;
    component.selectedItem.actual = null;

    expect(component.minValue).toBe(0);
  });

  it('minValue should return negative value', () => {
    component.selectedItem = ITEMDUMMY;
    component.selectedItem.actual = 4;

    expect(component.minValue).toBe(-4);
  });

  it('maxValue should be positive target > actual', () => {
    component.selectedItem = ITEMDUMMY;
    component.selectedItem.actual = 4;
    component.selectedItem.target = 6;

    expect(component.maxValue).toBe(2);
  });

  it('maxValue should be negative actual === null & target < 0', () => {
    component.selectedItem = ITEMDUMMY;
    component.selectedItem.actual = null;
    component.selectedItem.target = -3;

    expect(component.maxValue).toBe(-3);
  });

  it('maxValue should be negative actual > 0 & target === 0', () => {
    component.selectedItem = ITEMDUMMY;
    component.selectedItem.actual = 5;
    component.selectedItem.target = null;

    expect(component.maxValue).toBe(-5);
  });

  it('should return key/values of an object', () => {
    component.selectedItem = ITEMDUMMY;

    const entries = component.getEntries();
    const expectedValue = Object.entries(ITEMDUMMY);

    expect(entries).toEqual(expectedValue);
  });

  // it('getValidationError', fakeAsync(() => {
  //   component.selectedItem = ITEMDUMMY;

  //   tick();

  //   component.ngControl.valueAccessor?.writeValue(7);

  //   const validationError = component.getValidationError();

  //   expect(validationError).toBe('max');
  // }))

});
