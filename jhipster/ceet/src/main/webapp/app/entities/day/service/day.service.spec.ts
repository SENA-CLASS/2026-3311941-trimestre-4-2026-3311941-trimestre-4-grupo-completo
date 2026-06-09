import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IDay } from '../day.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../day.test-samples';

import { DayService } from './day.service';

const requireRestSample: IDay = {
  ...sampleWithRequiredData,
};

describe('Day Service', () => {
  let service: DayService;
  let httpMock: HttpTestingController;
  let expectedResult: IDay | IDay[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Day', () => {
      const day = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(day).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Day', () => {
      const day = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(day).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Day', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Day', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Day', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addDayToCollectionIfMissing', () => {
      it('should add a Day to an empty array', () => {
        const day: IDay = sampleWithRequiredData;
        expectedResult = service.addDayToCollectionIfMissing([], day);
        expect(expectedResult).toEqual([day]);
      });

      it('should not add a Day to an array that contains it', () => {
        const day: IDay = sampleWithRequiredData;
        const dayCollection: IDay[] = [
          {
            ...day,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDayToCollectionIfMissing(dayCollection, day);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Day to an array that doesn't contain it", () => {
        const day: IDay = sampleWithRequiredData;
        const dayCollection: IDay[] = [sampleWithPartialData];
        expectedResult = service.addDayToCollectionIfMissing(dayCollection, day);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(day);
      });

      it('should add only unique Day to an array', () => {
        const dayArray: IDay[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dayCollection: IDay[] = [sampleWithRequiredData];
        expectedResult = service.addDayToCollectionIfMissing(dayCollection, ...dayArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const day: IDay = sampleWithRequiredData;
        const day2: IDay = sampleWithPartialData;
        expectedResult = service.addDayToCollectionIfMissing([], day, day2);
        expect(expectedResult).toEqual([day, day2]);
      });

      it('should accept null and undefined values', () => {
        const day: IDay = sampleWithRequiredData;
        expectedResult = service.addDayToCollectionIfMissing([], null, day, undefined);
        expect(expectedResult).toEqual([day]);
      });

      it('should return initial array if no Day is added', () => {
        const dayCollection: IDay[] = [sampleWithRequiredData];
        expectedResult = service.addDayToCollectionIfMissing(dayCollection, undefined, null);
        expect(expectedResult).toEqual(dayCollection);
      });
    });

    describe('compareDay', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDay(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
        const entity2 = null;

        const compareResult1 = service.compareDay(entity1, entity2);
        const compareResult2 = service.compareDay(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
        const entity2 = { id: 'c3c5c445-4f79-4566-bfd4-47c60ed1bf8e' };

        const compareResult1 = service.compareDay(entity1, entity2);
        const compareResult2 = service.compareDay(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };
        const entity2 = { id: '712b4dd0-c635-4121-a9e3-1854687dde35' };

        const compareResult1 = service.compareDay(entity1, entity2);
        const compareResult2 = service.compareDay(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
