import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ILearningResult } from '../learning-result.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../learning-result.test-samples';

import { LearningResultService } from './learning-result.service';

const requireRestSample: ILearningResult = {
  ...sampleWithRequiredData,
};

describe('LearningResult Service', () => {
  let service: LearningResultService;
  let httpMock: HttpTestingController;
  let expectedResult: ILearningResult | ILearningResult[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LearningResultService);
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

    it('should create a LearningResult', () => {
      const learningResult = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(learningResult).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LearningResult', () => {
      const learningResult = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(learningResult).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LearningResult', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LearningResult', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LearningResult', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addLearningResultToCollectionIfMissing', () => {
      it('should add a LearningResult to an empty array', () => {
        const learningResult: ILearningResult = sampleWithRequiredData;
        expectedResult = service.addLearningResultToCollectionIfMissing([], learningResult);
        expect(expectedResult).toEqual([learningResult]);
      });

      it('should not add a LearningResult to an array that contains it', () => {
        const learningResult: ILearningResult = sampleWithRequiredData;
        const learningResultCollection: ILearningResult[] = [
          {
            ...learningResult,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLearningResultToCollectionIfMissing(learningResultCollection, learningResult);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LearningResult to an array that doesn't contain it", () => {
        const learningResult: ILearningResult = sampleWithRequiredData;
        const learningResultCollection: ILearningResult[] = [sampleWithPartialData];
        expectedResult = service.addLearningResultToCollectionIfMissing(learningResultCollection, learningResult);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(learningResult);
      });

      it('should add only unique LearningResult to an array', () => {
        const learningResultArray: ILearningResult[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const learningResultCollection: ILearningResult[] = [sampleWithRequiredData];
        expectedResult = service.addLearningResultToCollectionIfMissing(learningResultCollection, ...learningResultArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const learningResult: ILearningResult = sampleWithRequiredData;
        const learningResult2: ILearningResult = sampleWithPartialData;
        expectedResult = service.addLearningResultToCollectionIfMissing([], learningResult, learningResult2);
        expect(expectedResult).toEqual([learningResult, learningResult2]);
      });

      it('should accept null and undefined values', () => {
        const learningResult: ILearningResult = sampleWithRequiredData;
        expectedResult = service.addLearningResultToCollectionIfMissing([], null, learningResult, undefined);
        expect(expectedResult).toEqual([learningResult]);
      });

      it('should return initial array if no LearningResult is added', () => {
        const learningResultCollection: ILearningResult[] = [sampleWithRequiredData];
        expectedResult = service.addLearningResultToCollectionIfMissing(learningResultCollection, undefined, null);
        expect(expectedResult).toEqual(learningResultCollection);
      });
    });

    describe('compareLearningResult', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLearningResult(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
        const entity2 = null;

        const compareResult1 = service.compareLearningResult(entity1, entity2);
        const compareResult2 = service.compareLearningResult(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
        const entity2 = { id: '18957aee-fabd-42ae-ac8b-2f943a81490c' };

        const compareResult1 = service.compareLearningResult(entity1, entity2);
        const compareResult2 = service.compareLearningResult(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };
        const entity2 = { id: '3df09e7d-3257-43f7-9cef-54f68c48c0ac' };

        const compareResult1 = service.compareLearningResult(entity1, entity2);
        const compareResult2 = service.compareLearningResult(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
