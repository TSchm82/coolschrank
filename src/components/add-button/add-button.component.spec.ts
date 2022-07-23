import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { FRIDGEDUMMY } from 'src/Dummies/fridge-dummy';
import { ITEMDUMMY } from 'src/Dummies/item-dummy';

import { AddbuttonComponent } from './add-button.component';

describe('AddbuttonComponent', () => {
  let component: AddbuttonComponent;
  let fixture: ComponentFixture<AddbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [AddbuttonComponent]
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

    spyOn(component.itemAdded, 'emit').and.resolveTo();

    fixture.detectChanges();

    expect(component.itemAdded.emit).toHaveBeenCalled();
  });

  // it('should emit event ', async () => {
  //   spyOn(component.itemAdded, 'emit');

  //   await component.addItem().finally(() => {
  //     expect(component.itemAdded.emit).toHaveBeenCalled();
  //   });

  // });

});
