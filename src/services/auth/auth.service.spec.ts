import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should set user and password on login', () => {
    service.login('testUser', 'testPassword');

    expect(service.user).toBe('testUser');
    expect(service.password).toBe('testPassword');
  })

  it('Should reset user and password on logout', () => {
    service.user = 'testUser';
    service.user = 'testPassword';
    service.logout();

    expect(service.user).toBeNull();
    expect(service.password).toBeNull();
  })

  it('Should be authenticated after login', () => {
    service.login('testUser', 'testPassword');

    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBe(true);
  })

  it('Should not be authenticated when user eq null', () => {
    service.user = null;
    service.password = 'testPassword';

    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBe(false);
  })

  it('Should not be authenticated when password eq null', () => {
    service.user = 'testUser';
    service.password = null;

    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBe(false);
  })

  it('Should return encoded string', () => {
    service.user = 'testUser';
    service.password = 'testPassword';

    const encodedString = btoa(`${service.user}:${service.password}`)
    const key = service.getKey();

    expect(key).toBe(encodedString);
  })

});
