import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  const key = 'testKey';
  const value = { id: 'testId', name: 'testName' };
  const valueAsJSON = JSON.stringify(value);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should store settings', () => {
    service.saveSettings(key, value);

    const storedValue = localStorage.getItem(key);

    expect(storedValue).toBe(valueAsJSON);
  });

  it('should get value', () => {
    localStorage.setItem(key, valueAsJSON);

    const storedValue = JSON.stringify(service.getSettings(key));

    expect(storedValue).toBe(valueAsJSON);
  });

  it('should return null when nothing was stored', () => {
    const storedValue = service.getSettings('NonExistantKey');

    expect(storedValue).toBeNull();
  });


});
