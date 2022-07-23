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
    component.selectPage(2);

    expect(component.page).toBe(6);
  });

  it("should decrease page", () => {
    component.selectPage(-3);

    expect(component.page).toBe(1);
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

});
