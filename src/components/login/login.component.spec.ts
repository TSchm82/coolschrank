import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AuthService } from 'src/services/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    component.user = 'fakeUser';
    component.password = 'fakePassword';

    component.login();

    const isAutenticated = component.authService.isAuthenticated();

    expect(isAutenticated).toBe(true);
  });

  it('should call login() on button click', fakeAsync(() => {
    spyOn(component, 'login');

    let btn = fixture.debugElement.query(By.css('.btn'));
    btn.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.login).toHaveBeenCalled();
  }));

})
