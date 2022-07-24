import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/services/auth/auth.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const authServiceSpy = jasmine.createSpyObj<AuthService>(['logout', 'isAuthenticated']);
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Fridge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Fridge');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('coolschrank app is running!');
  // });

  it('should logout on click', fakeAsync(() => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    let logout = fixture.debugElement.query(By.css('.logout'));
    logout.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(authServiceSpy.logout).toHaveBeenCalled();
  }));
});
