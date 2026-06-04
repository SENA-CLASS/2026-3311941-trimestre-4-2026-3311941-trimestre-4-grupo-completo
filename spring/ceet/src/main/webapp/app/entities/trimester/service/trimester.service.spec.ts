import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ITrimester } from '../trimester.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../trimester.test-samples';

import { TrimesterService } from './trimester.service';

const requireRestSample: ITrimester = {
  ...sampleWithRequiredData,
};

describe('Trimester Service', () => {
  let service: TrimesterService;
  let httpMock: HttpTestingController;
  let expectedResult: ITrimester | ITrimester[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TrimesterService);
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

    it('should create a Trimester', () => {
      const trimester = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(trimester).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Trimester', () => {
      const trimester = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(trimester).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Trimester', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Trimester', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Trimester', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addTrimesterToCollectionIfMissing', () => {
      it('should add a Trimester to an empty array', () => {
        const trimester: ITrimester = sampleWithRequiredData;
        expectedResult = service.addTrimesterToCollectionIfMissing([], trimester);
        expect(expectedResult).toEqual([trimester]);
      });

      it('should not add a Trimester to an array that contains it', () => {
        const trimester: ITrimester = sampleWithRequiredData;
        const trimesterCollection: ITrimester[] = [
          {
            ...trimester,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTrimesterToCollectionIfMissing(trimesterCollection, trimester);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Trimester to an array that doesn't contain it", () => {
        const trimester: ITrimester = sampleWithRequiredData;
        const trimesterCollection: ITrimester[] = [sampleWithPartialData];
        expectedResult = service.addTrimesterToCollectionIfMissing(trimesterCollection, trimester);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trimester);
      });

      it('should add only unique Trimester to an array', () => {
        const trimesterArray: ITrimester[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const trimesterCollection: ITrimester[] = [sampleWithRequiredData];
        expectedResult = service.addTrimesterToCollectionIfMissing(trimesterCollection, ...trimesterArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const trimester: ITrimester = sampleWithRequiredData;
        const trimester2: ITrimester = sampleWithPartialData;
        expectedResult = service.addTrimesterToCollectionIfMissing([], trimester, trimester2);
        expect(expectedResult).toEqual([trimester, trimester2]);
      });

      it('should accept null and undefined values', () => {
        const trimester: ITrimester = sampleWithRequiredData;
        expectedResult = service.addTrimesterToCollectionIfMissing([], null, trimester, undefined);
        expect(expectedResult).toEqual([trimester]);
      });

      it('should return initial array if no Trimester is added', () => {
        const trimesterCollection: ITrimester[] = [sampleWithRequiredData];
        expectedResult = service.addTrimesterToCollectionIfMissing(trimesterCollection, undefined, null);
        expect(expectedResult).toEqual(trimesterCollection);
      });
    });

    describe('compareTrimester', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTrimester(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
        const entity2 = null;

        const compareResult1 = service.compareTrimester(entity1, entity2);
        const compareResult2 = service.compareTrimester(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
        const entity2 = { id: 'fc8f5153-f1b8-4ede-b817-9b6c218e886f' };

        const compareResult1 = service.compareTrimester(entity1, entity2);
        const compareResult2 = service.compareTrimester(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };
        const entity2 = { id: '23943bac-1112-4eec-a590-f244e6fcb60b' };

        const compareResult1 = service.compareTrimester(entity1, entity2);
        const compareResult2 = service.compareTrimester(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
