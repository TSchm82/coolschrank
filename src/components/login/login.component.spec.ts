import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [LoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', fakeAsync(() => {
    component.user = 'fakeUser';
    component.password = 'fakePassword';

    component.login();
    tick();

    const isAutenticated = component.authService.isAuthenticated();

    expect(isAutenticated).toBe(true);
  }));

  it('should call login() on button click', fakeAsync(() => {
    spyOn(component, 'login');

    let btn = fixture.debugElement.query(By.css('.btn'));
    btn.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.login).toHaveBeenCalled();
  }));

})
