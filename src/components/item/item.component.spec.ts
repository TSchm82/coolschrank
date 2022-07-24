import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ITEMDUMMY } from 'src/Dummies/item-dummy';
import { ApiService } from 'src/services/api/api.service';

import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  const apiServiceSpy = jasmine.createSpyObj<ApiService>(['getItem', 'updateItem']);
  apiServiceSpy.getItem.and.returnValue(of(ITEMDUMMY));
  apiServiceSpy.updateItem.and.returnValue(of(ITEMDUMMY));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ItemComponent],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.selectedItem = ITEMDUMMY;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should overwrite selected item', () => {
    component.selectedItem.name = 'deviating name';
    component.setItem(ITEMDUMMY);

    expect(component.selectedItem).toBe(ITEMDUMMY);
  });

  it('minValue should return o when no actual value is set', () => {
    component.selectedItem.actual = null;

    expect(component.minValue).toBe(0);
  });

  it('minValue should return negative value when actual is negative', () => {
    component.selectedItem.actual = 4;

    expect(component.minValue).toBe(-4);
  });

  it('minValue should return positive value when actual is negative', () => {
    component.selectedItem.actual = -4;

    expect(component.minValue).toBe(4);
  });

  it('maxValue should be positive target > actual', () => {
    component.selectedItem.actual = 4;
    component.selectedItem.target = 6;

    expect(component.maxValue).toBe(2);
  });

  it('maxValue should return o when actual and target value are null', () => {
    component.selectedItem.actual = null;
    component.selectedItem.target = null;

    expect(component.maxValue).toBe(0);
  });

  it('maxValue should be negative when actual is null & target is negative', () => {
    component.selectedItem.actual = null;
    component.selectedItem.target = -3;

    expect(component.maxValue).toBe(-3);
  });

  it('maxValue should be negative when actual is positive & target is null', () => {
    component.selectedItem.actual = 5;
    component.selectedItem.target = null;

    expect(component.maxValue).toBe(-5);
  });

  it('maxValue should be positive when actual is null & target is positive', () => {
    component.selectedItem.actual = null;
    component.selectedItem.target = 3;

    expect(component.maxValue).toBe(3);
  });

  it('maxValue should be negative when actual is negative & target is null', () => {
    component.selectedItem.actual = -5;
    component.selectedItem.target = null;

    expect(component.maxValue).toBe(5);
  });

  it('maxValue should be 0 when selectedItem is undefined', () => {
    let undefined: any;

    component.selectedItem = undefined;

    expect(component.maxValue).toBe(0);
  });

  it('should return key/values of an object', () => {
    const entries = component.getEntries();
    const expectedValue = Object.entries(ITEMDUMMY);

    expect(entries).toEqual(expectedValue);
  });

  it('should define selectedItem on changes when id exists', fakeAsync(() => {
    spyOn(component, 'setItem');

    component.selectedItemId = 5;
    component.ngOnChanges();

    tick(1000);

    expect(component.setItem).toHaveBeenCalled();
  }));

  it('should do nothing on changes when id is undefined', fakeAsync(() => {
    spyOn(component, 'setItem');

    component.ngOnChanges();

    tick(1000);

    expect(component.setItem).toHaveBeenCalledTimes(0);
  }));

  it('should call updateItem() on click', fakeAsync(() => {
    spyOn(component, 'updateItem');

    let btn = fixture.debugElement.query(By.css('.btn'));
    btn.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.updateItem).toHaveBeenCalled();
  }));

  it('should call apiService function updateItem', fakeAsync(() => {
    component.updateItem();

    expect(apiServiceSpy.updateItem).toHaveBeenCalled();
  }));

  it('should reset modifyValue after update', () => {
    component.modifyValue = 5;

    component.updateItem();

    expect(component.modifyValue).toBe(0);
  });

  it('should return max validation error', () => {
    component.modifyValue = 6;

    expect(component.getValidationError(+5, -5)).toBe('Too high');
  })

  it('should return min validation error', () => {
    component.modifyValue = -6;

    expect(component.getValidationError(+5, -5)).toBe('Too low');
  })

  it('should return no validation error', () => {
    component.modifyValue = 3;

    expect(component.getValidationError(+5, -5)).toBe('');
  })

});
