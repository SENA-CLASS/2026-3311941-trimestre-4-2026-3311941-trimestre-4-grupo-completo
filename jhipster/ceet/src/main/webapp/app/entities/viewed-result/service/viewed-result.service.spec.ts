import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IViewedResult } from '../viewed-result.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../viewed-result.test-samples';

import { ViewedResultService } from './viewed-result.service';

const requireRestSample: IViewedResult = {
  ...sampleWithRequiredData,
};

describe('ViewedResult Service', () => {
  let service: ViewedResultService;
  let httpMock: HttpTestingController;
  let expectedResult: IViewedResult | IViewedResult[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ViewedResultService);
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

    it('should create a ViewedResult', () => {
      const viewedResult = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(viewedResult).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ViewedResult', () => {
      const viewedResult = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(viewedResult).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ViewedResult', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ViewedResult', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ViewedResult', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addViewedResultToCollectionIfMissing', () => {
      it('should add a ViewedResult to an empty array', () => {
        const viewedResult: IViewedResult = sampleWithRequiredData;
        expectedResult = service.addViewedResultToCollectionIfMissing([], viewedResult);
        expect(expectedResult).toEqual([viewedResult]);
      });

      it('should not add a ViewedResult to an array that contains it', () => {
        const viewedResult: IViewedResult = sampleWithRequiredData;
        const viewedResultCollection: IViewedResult[] = [
          {
            ...viewedResult,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addViewedResultToCollectionIfMissing(viewedResultCollection, viewedResult);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ViewedResult to an array that doesn't contain it", () => {
        const viewedResult: IViewedResult = sampleWithRequiredData;
        const viewedResultCollection: IViewedResult[] = [sampleWithPartialData];
        expectedResult = service.addViewedResultToCollectionIfMissing(viewedResultCollection, viewedResult);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(viewedResult);
      });

      it('should add only unique ViewedResult to an array', () => {
        const viewedResultArray: IViewedResult[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const viewedResultCollection: IViewedResult[] = [sampleWithRequiredData];
        expectedResult = service.addViewedResultToCollectionIfMissing(viewedResultCollection, ...viewedResultArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const viewedResult: IViewedResult = sampleWithRequiredData;
        const viewedResult2: IViewedResult = sampleWithPartialData;
        expectedResult = service.addViewedResultToCollectionIfMissing([], viewedResult, viewedResult2);
        expect(expectedResult).toEqual([viewedResult, viewedResult2]);
      });

      it('should accept null and undefined values', () => {
        const viewedResult: IViewedResult = sampleWithRequiredData;
        expectedResult = service.addViewedResultToCollectionIfMissing([], null, viewedResult, undefined);
        expect(expectedResult).toEqual([viewedResult]);
      });

      it('should return initial array if no ViewedResult is added', () => {
        const viewedResultCollection: IViewedResult[] = [sampleWithRequiredData];
        expectedResult = service.addViewedResultToCollectionIfMissing(viewedResultCollection, undefined, null);
        expect(expectedResult).toEqual(viewedResultCollection);
      });
    });

    describe('compareViewedResult', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareViewedResult(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'dceb3c65-7ad5-4d2c-adee-22240c1d2286' };
        const entity2 = null;

        const compareResult1 = service.compareViewedResult(entity1, entity2);
        const compareResult2 = service.compareViewedResult(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'dceb3c65-7ad5-4d2c-adee-22240c1d2286' };
        const entity2 = { id: '9654f016-d4cb-4bc3-9d46-d5f6c821cccb' };

        const compareResult1 = service.compareViewedResult(entity1, entity2);
        const compareResult2 = service.compareViewedResult(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'dceb3c65-7ad5-4d2c-adee-22240c1d2286' };
        const entity2 = { id: 'dceb3c65-7ad5-4d2c-adee-22240c1d2286' };

        const compareResult1 = service.compareViewedResult(entity1, entity2);
        const compareResult2 = service.compareViewedResult(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
