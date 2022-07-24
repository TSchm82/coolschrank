import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.page = 4;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should increase page", () => {
    spyOn(component, 'isDisabled').and.returnValue(false);

    component.selectPage(2);

    expect(component.page).toBe(6);
  });

  it("should decrease page", () => {
    spyOn(component, 'isDisabled').and.returnValue(false);

    component.selectPage(-3);

    expect(component.page).toBe(1);
  });

  it("should do nothing when isDisabled(modifier) is true", () => {
    spyOn(component, 'isDisabled').and.returnValue(true);

    component.selectPage(-3);

    expect(component.page).toBe(4);
  });

  it("should emit page change", () => {
    spyOn(component.pageChange, 'emit');

    component.selectPage(2);

    expect(component.pageChange.emit).toHaveBeenCalled();
  });

  it("should return disabled when limit has been exceeded", () => {
    expect(component.isDisabled(-4)).toBeTrue();
  });

  it("should return disabled when limit has been exceeded", () => {
    component.inventoryLength = 20;

    expect(component.isDisabled(2)).toBeTrue();
  });

  it("should calculate correct amount of pages", () => {
    component.inventoryLength = 20;
    expect(component.pages.length).toBe(5);
  });

  it("should calculate correct amount of pages when rounded", () => {
    component.inventoryLength = 18;
    expect(component.pages.length).toBe(5);
  });

  it("should return [1] when inventoryLngth is undefined", () => {
    expect(component.pages).toEqual([1]);
  });

});
