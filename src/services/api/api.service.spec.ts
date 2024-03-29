import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FRIDGEDUMMY } from 'src/Dummies/fridge-dummy';
import { ITEMDUMMY } from 'src/Dummies/item-dummy';

const apiServer = 'https://innovations.rola.com/build/rola/coolschrank/ongoing/application';
const fridgeId = '12345';
const itemId = 678;

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
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
    req.flush(FRIDGEDUMMY);
  });

  it('getFridge() should return data', () => {
    service.getFridge(fridgeId).subscribe((res) => {
      expect(res).toEqual(FRIDGEDUMMY);
    });

    const req = httpMock.expectOne(`${apiServer}/fridge/${fridgeId}`);
    req.flush(FRIDGEDUMMY);
  });

  it('addItem() should return data', () => {
    service.addItem(fridgeId, ITEMDUMMY).subscribe((res) => {
      expect(res).toEqual(ITEMDUMMY);
    });

    const req = httpMock.expectOne(`${apiServer}/fridge/${fridgeId}/item`);;
    req.flush(ITEMDUMMY);
  });

  it('getItem() should return data', () => {
    service.getItem(fridgeId, itemId).subscribe((res) => {
      expect(res).toEqual(ITEMDUMMY);
    });

    const req = httpMock.expectOne(`${apiServer}/fridge/${fridgeId}/item/${itemId}`);
    req.flush(ITEMDUMMY);
  });

  it('updateItem() should return data', () => {
    service.updateItem(fridgeId, ITEMDUMMY).subscribe((res) => {
      expect(res).toEqual(ITEMDUMMY);
    });

    const req = httpMock.expectOne(`${apiServer}/fridge/${fridgeId}/item/${ITEMDUMMY.id}`);
    req.flush(ITEMDUMMY);
  });

  it("should log error in console", () => {
    const spy = spyOn(console, 'error');

    const expected = {
      code: "validationFailed",
      message: "Invalid input",
    };

    service.handleError(expected);

    expect(spy).toHaveBeenCalledWith('error caught in api service:', expected);
  });

  it("should return error", () => {
    const newError = new Error('Api request error');

    service.getItem(fridgeId, itemId).subscribe({
      error: (error) => expect(error).toEqual(newError)
    });

    const req = httpMock.expectOne(`${apiServer}/fridge/${fridgeId}/item/${itemId}`);
    req.error(new ErrorEvent('API error'))
  });

})
