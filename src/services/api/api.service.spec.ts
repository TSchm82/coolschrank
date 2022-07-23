import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FRIDGEDUMMY } from 'src/Dummies/fridge-dummy';
import { ITEMDUMMY } from 'src/Dummies/item-dummy';
import { AppModule } from 'src/app/app.module';

const apiServer = 'https://innovations.rola.com/build/rola/coolschrank/ongoing/application';
const fridgeId = '12345';
const itemId = 678;

describe('ApiService', () => {
  let service: ApiService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createFridge() should return data', () => {
    service.createFridge().subscribe((res) => {
      expect(res).toEqual(FRIDGEDUMMY);
    });

    const req = httpMock.expectOne(`${apiServer}/fridge`);
    expect(req.request.method).toBe('POST');
    req.flush(FRIDGEDUMMY);
  });

  it('getFridge() should return data', () => {
    service.getFridge(fridgeId).subscribe((res) => {
      expect(res).toEqual(FRIDGEDUMMY);
    });

    const req = httpMock.expectOne(`${apiServer}/fridge/${fridgeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(FRIDGEDUMMY);
  });

  it('addItem() should return data', () => {
    service.addItem(fridgeId, ITEMDUMMY).subscribe((res) => {
      expect(res).toEqual(ITEMDUMMY);
    });

    const req = httpMock.expectOne(`${apiServer}/fridge/${fridgeId}/item`);
    expect(req.request.method).toBe('POST');
    req.flush(ITEMDUMMY);
  });

  it('getItem() should return data', () => {
    service.getItem(fridgeId, itemId).subscribe((res) => {
      expect(res).toEqual(ITEMDUMMY);
    });

    const req = httpMock.expectOne(`${apiServer}/fridge/${fridgeId}/item/${itemId}`);
    expect(req.request.method).toBe('GET');
    req.flush(ITEMDUMMY);
  });

  it('updateItem() should return data', () => {
    service.updateItem(fridgeId, ITEMDUMMY).subscribe((res) => {
      expect(res).toEqual(ITEMDUMMY);
    });

    const req = httpMock.expectOne(`${apiServer}/fridge/${fridgeId}/item/${ITEMDUMMY.id}`);
    expect(req.request.method).toBe('POST');
    req.flush(ITEMDUMMY);
  });

});
