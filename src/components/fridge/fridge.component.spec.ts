import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FRIDGEDUMMY } from 'src/Dummies/fridge-dummy';
import { ITEMDUMMY } from 'src/Dummies/item-dummy';
import { ApiService } from 'src/services/api/api.service';
import { of } from 'rxjs';

import { FridgeComponent, ITEMSPERPAGE } from './fridge.component';
import { SettingsService } from 'src/services/settings/settings.service';
import { AuthService } from 'src/services/auth/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FridgeComponent', () => {
  let component: FridgeComponent;
  let fixture: ComponentFixture<FridgeComponent>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>(['getFridge', 'createFridge']);
    apiServiceSpy.getFridge.and.returnValue(of(FRIDGEDUMMY));
    apiServiceSpy.createFridge.and.returnValue(of(FRIDGEDUMMY));

    const authServiceSpy = jasmine.createSpyObj<AuthService>(['getKey']);
    authServiceSpy.getKey.and.returnValue('dummyKey');

    await TestBed.configureTestingModule({
      declarations: [FridgeComponent],
      providers: [
        SettingsService,
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FridgeComponent);
    component = fixture.componentInstance;
    component.fridge = FRIDGEDUMMY;

    spyOn(component.settingsService, 'saveSettings');

    // create more elementsto test paging
    for (let i = 0; i < 20; i++) {
      component.fridge.inventory.push(JSON.parse(JSON.stringify(ITEMDUMMY)));
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set item id', () => {
    component.selectItem(5);

    expect(component.selectedItemId).toBe(5);
  });

  it('should update fridge', () => {
    component.fridge.inventory = [];
    component.updateFridge(FRIDGEDUMMY);

    expect(component.fridge).toBe(FRIDGEDUMMY);
  });

  it('should get x items per page', () => {
    expect(component.getItemPage(3).length).toBe(ITEMSPERPAGE);
  });


  it('should have correct start index ', () => {
    const startIndex = 2 * ITEMSPERPAGE;

    expect(component.getItemPage(3)[0]).toBe(component.fridge.inventory[startIndex]);
  });

  it('should have correct end index ', () => {
    const endIndex = (3 * ITEMSPERPAGE) - 1;
    const sectionEnd = ITEMSPERPAGE - 1;

    expect(component.getItemPage(3)[sectionEnd]).toBe(component.fridge.inventory[endIndex]);
  });

  it('should read fridge', () => {
    component.fridge = { id: 'mock', inventory: [] };

    component.read('id');

    expect(component.fridge).toBe(FRIDGEDUMMY);
  });

  it('should create fridge', () => {
    component.fridge = { id: 'mock', inventory: [] };

    component.create('id');

    expect(component.fridge).toBe(FRIDGEDUMMY);
  });

  it('should create fridge when no id exists', () => {
    spyOn(component, 'create')
    spyOn(component.settingsService, 'getSettings').and.returnValue(null);

    component.initializeFridge();

    expect(component.create).toHaveBeenCalled();
  });

  it('should read fridge when id exists', () => {
    spyOn(component, 'read')
    spyOn(component.settingsService, 'getSettings').and.returnValue('testId');

    component.initializeFridge();

    expect(component.read).toHaveBeenCalled();
  });

  it('should select item on click', fakeAsync(() => {
    spyOn(component, 'selectItem');

    let card = fixture.debugElement.query(By.css('.card'));
    card.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.selectItem).toHaveBeenCalled();
  }));

});

