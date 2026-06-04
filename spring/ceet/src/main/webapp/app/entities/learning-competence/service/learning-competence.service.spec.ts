import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ILearningCompetence } from '../learning-competence.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../learning-competence.test-samples';

import { LearningCompetenceService } from './learning-competence.service';

const requireRestSample: ILearningCompetence = {
  ...sampleWithRequiredData,
};

describe('LearningCompetence Service', () => {
  let service: LearningCompetenceService;
  let httpMock: HttpTestingController;
  let expectedResult: ILearningCompetence | ILearningCompetence[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LearningCompetenceService);
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

    it('should create a LearningCompetence', () => {
      const learningCompetence = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(learningCompetence).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LearningCompetence', () => {
      const learningCompetence = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(learningCompetence).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LearningCompetence', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LearningCompetence', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LearningCompetence', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addLearningCompetenceToCollectionIfMissing', () => {
      it('should add a LearningCompetence to an empty array', () => {
        const learningCompetence: ILearningCompetence = sampleWithRequiredData;
        expectedResult = service.addLearningCompetenceToCollectionIfMissing([], learningCompetence);
        expect(expectedResult).toEqual([learningCompetence]);
      });

      it('should not add a LearningCompetence to an array that contains it', () => {
        const learningCompetence: ILearningCompetence = sampleWithRequiredData;
        const learningCompetenceCollection: ILearningCompetence[] = [
          {
            ...learningCompetence,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLearningCompetenceToCollectionIfMissing(learningCompetenceCollection, learningCompetence);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LearningCompetence to an array that doesn't contain it", () => {
        const learningCompetence: ILearningCompetence = sampleWithRequiredData;
        const learningCompetenceCollection: ILearningCompetence[] = [sampleWithPartialData];
        expectedResult = service.addLearningCompetenceToCollectionIfMissing(learningCompetenceCollection, learningCompetence);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(learningCompetence);
      });

      it('should add only unique LearningCompetence to an array', () => {
        const learningCompetenceArray: ILearningCompetence[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const learningCompetenceCollection: ILearningCompetence[] = [sampleWithRequiredData];
        expectedResult = service.addLearningCompetenceToCollectionIfMissing(learningCompetenceCollection, ...learningCompetenceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const learningCompetence: ILearningCompetence = sampleWithRequiredData;
        const learningCompetence2: ILearningCompetence = sampleWithPartialData;
        expectedResult = service.addLearningCompetenceToCollectionIfMissing([], learningCompetence, learningCompetence2);
        expect(expectedResult).toEqual([learningCompetence, learningCompetence2]);
      });

      it('should accept null and undefined values', () => {
        const learningCompetence: ILearningCompetence = sampleWithRequiredData;
        expectedResult = service.addLearningCompetenceToCollectionIfMissing([], null, learningCompetence, undefined);
        expect(expectedResult).toEqual([learningCompetence]);
      });

      it('should return initial array if no LearningCompetence is added', () => {
        const learningCompetenceCollection: ILearningCompetence[] = [sampleWithRequiredData];
        expectedResult = service.addLearningCompetenceToCollectionIfMissing(learningCompetenceCollection, undefined, null);
        expect(expectedResult).toEqual(learningCompetenceCollection);
      });
    });

    describe('compareLearningCompetence', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLearningCompetence(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
        const entity2 = null;

        const compareResult1 = service.compareLearningCompetence(entity1, entity2);
        const compareResult2 = service.compareLearningCompetence(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
        const entity2 = { id: '3aea7988-06c6-469f-ac06-f7b3b58ed0b7' };

        const compareResult1 = service.compareLearningCompetence(entity1, entity2);
        const compareResult2 = service.compareLearningCompetence(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };
        const entity2 = { id: '67a3ee40-7a88-4800-b512-8818586690b5' };

        const compareResult1 = service.compareLearningCompetence(entity1, entity2);
        const compareResult2 = service.compareLearningCompetence(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
