import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FRIDGEDUMMY } from 'src/Dummies/fridge-dummy';
import { ITEMDUMMY } from 'src/Dummies/item-dummy';
import { ApiService } from 'src/services/api/api.service';

import { AddbuttonComponent } from './add-button.component';

describe('AddbuttonComponent', () => {
  let component: AddbuttonComponent;
  let fixture: ComponentFixture<AddbuttonComponent>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>(['addItem']);
    apiServiceSpy.addItem.and.returnValue(of(ITEMDUMMY));

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [AddbuttonComponent],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddbuttonComponent);
    component = fixture.componentInstance;
    component.fridge = FRIDGEDUMMY;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addItem() on button click', fakeAsync(() => {
    spyOn(component, 'addItem');

    let btn = fixture.debugElement.query(By.css('.btn'));
    btn.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.addItem).toHaveBeenCalled();
  }));

  it('should reset name', () => {
    component.newItem.name = 'testName';
    component.newItem = component.newItemPristine();

    expect(component.newItem.name).toBeNull();
  });

  it('should reset target', () => {
    component.newItem.target = 6;
    component.newItem = component.newItemPristine();

    expect(component.newItem.target).toBeNull();
  });


  it("should add item", async () => {
    spyOn(component.itemAdded, 'emit');

    component.addItem();

    expect(component.itemAdded.emit).toHaveBeenCalled();
  });

});
