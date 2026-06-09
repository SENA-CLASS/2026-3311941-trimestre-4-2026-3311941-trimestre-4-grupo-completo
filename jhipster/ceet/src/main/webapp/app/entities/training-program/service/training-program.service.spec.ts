import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ITrainingProgram } from '../training-program.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../training-program.test-samples';

import { TrainingProgramService } from './training-program.service';

const requireRestSample: ITrainingProgram = {
  ...sampleWithRequiredData,
};

describe('TrainingProgram Service', () => {
  let service: TrainingProgramService;
  let httpMock: HttpTestingController;
  let expectedResult: ITrainingProgram | ITrainingProgram[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TrainingProgramService);
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

    it('should create a TrainingProgram', () => {
      const trainingProgram = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(trainingProgram).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TrainingProgram', () => {
      const trainingProgram = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(trainingProgram).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TrainingProgram', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TrainingProgram', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TrainingProgram', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addTrainingProgramToCollectionIfMissing', () => {
      it('should add a TrainingProgram to an empty array', () => {
        const trainingProgram: ITrainingProgram = sampleWithRequiredData;
        expectedResult = service.addTrainingProgramToCollectionIfMissing([], trainingProgram);
        expect(expectedResult).toEqual([trainingProgram]);
      });

      it('should not add a TrainingProgram to an array that contains it', () => {
        const trainingProgram: ITrainingProgram = sampleWithRequiredData;
        const trainingProgramCollection: ITrainingProgram[] = [
          {
            ...trainingProgram,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTrainingProgramToCollectionIfMissing(trainingProgramCollection, trainingProgram);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TrainingProgram to an array that doesn't contain it", () => {
        const trainingProgram: ITrainingProgram = sampleWithRequiredData;
        const trainingProgramCollection: ITrainingProgram[] = [sampleWithPartialData];
        expectedResult = service.addTrainingProgramToCollectionIfMissing(trainingProgramCollection, trainingProgram);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trainingProgram);
      });

      it('should add only unique TrainingProgram to an array', () => {
        const trainingProgramArray: ITrainingProgram[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const trainingProgramCollection: ITrainingProgram[] = [sampleWithRequiredData];
        expectedResult = service.addTrainingProgramToCollectionIfMissing(trainingProgramCollection, ...trainingProgramArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const trainingProgram: ITrainingProgram = sampleWithRequiredData;
        const trainingProgram2: ITrainingProgram = sampleWithPartialData;
        expectedResult = service.addTrainingProgramToCollectionIfMissing([], trainingProgram, trainingProgram2);
        expect(expectedResult).toEqual([trainingProgram, trainingProgram2]);
      });

      it('should accept null and undefined values', () => {
        const trainingProgram: ITrainingProgram = sampleWithRequiredData;
        expectedResult = service.addTrainingProgramToCollectionIfMissing([], null, trainingProgram, undefined);
        expect(expectedResult).toEqual([trainingProgram]);
      });

      it('should return initial array if no TrainingProgram is added', () => {
        const trainingProgramCollection: ITrainingProgram[] = [sampleWithRequiredData];
        expectedResult = service.addTrainingProgramToCollectionIfMissing(trainingProgramCollection, undefined, null);
        expect(expectedResult).toEqual(trainingProgramCollection);
      });
    });

    describe('compareTrainingProgram', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTrainingProgram(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
        const entity2 = null;

        const compareResult1 = service.compareTrainingProgram(entity1, entity2);
        const compareResult2 = service.compareTrainingProgram(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
        const entity2 = { id: '7fba35d4-4d72-4e17-b4fd-ec279ba682a9' };

        const compareResult1 = service.compareTrainingProgram(entity1, entity2);
        const compareResult2 = service.compareTrainingProgram(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };
        const entity2 = { id: 'e35ca12a-dfa0-4f9c-9ffb-b83e56d621c3' };

        const compareResult1 = service.compareTrainingProgram(entity1, entity2);
        const compareResult2 = service.compareTrainingProgram(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
