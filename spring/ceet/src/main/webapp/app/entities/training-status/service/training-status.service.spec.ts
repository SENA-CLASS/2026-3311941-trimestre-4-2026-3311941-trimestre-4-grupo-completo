import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ITrainingStatus } from '../training-status.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../training-status.test-samples';

import { TrainingStatusService } from './training-status.service';

const requireRestSample: ITrainingStatus = {
  ...sampleWithRequiredData,
};

describe('TrainingStatus Service', () => {
  let service: TrainingStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: ITrainingStatus | ITrainingStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TrainingStatusService);
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

    it('should create a TrainingStatus', () => {
      const trainingStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(trainingStatus).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TrainingStatus', () => {
      const trainingStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(trainingStatus).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TrainingStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TrainingStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TrainingStatus', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addTrainingStatusToCollectionIfMissing', () => {
      it('should add a TrainingStatus to an empty array', () => {
        const trainingStatus: ITrainingStatus = sampleWithRequiredData;
        expectedResult = service.addTrainingStatusToCollectionIfMissing([], trainingStatus);
        expect(expectedResult).toEqual([trainingStatus]);
      });

      it('should not add a TrainingStatus to an array that contains it', () => {
        const trainingStatus: ITrainingStatus = sampleWithRequiredData;
        const trainingStatusCollection: ITrainingStatus[] = [
          {
            ...trainingStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTrainingStatusToCollectionIfMissing(trainingStatusCollection, trainingStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TrainingStatus to an array that doesn't contain it", () => {
        const trainingStatus: ITrainingStatus = sampleWithRequiredData;
        const trainingStatusCollection: ITrainingStatus[] = [sampleWithPartialData];
        expectedResult = service.addTrainingStatusToCollectionIfMissing(trainingStatusCollection, trainingStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trainingStatus);
      });

      it('should add only unique TrainingStatus to an array', () => {
        const trainingStatusArray: ITrainingStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const trainingStatusCollection: ITrainingStatus[] = [sampleWithRequiredData];
        expectedResult = service.addTrainingStatusToCollectionIfMissing(trainingStatusCollection, ...trainingStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const trainingStatus: ITrainingStatus = sampleWithRequiredData;
        const trainingStatus2: ITrainingStatus = sampleWithPartialData;
        expectedResult = service.addTrainingStatusToCollectionIfMissing([], trainingStatus, trainingStatus2);
        expect(expectedResult).toEqual([trainingStatus, trainingStatus2]);
      });

      it('should accept null and undefined values', () => {
        const trainingStatus: ITrainingStatus = sampleWithRequiredData;
        expectedResult = service.addTrainingStatusToCollectionIfMissing([], null, trainingStatus, undefined);
        expect(expectedResult).toEqual([trainingStatus]);
      });

      it('should return initial array if no TrainingStatus is added', () => {
        const trainingStatusCollection: ITrainingStatus[] = [sampleWithRequiredData];
        expectedResult = service.addTrainingStatusToCollectionIfMissing(trainingStatusCollection, undefined, null);
        expect(expectedResult).toEqual(trainingStatusCollection);
      });
    });

    describe('compareTrainingStatus', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTrainingStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '053bf031-a284-46fd-8586-1a656a154cf3' };
        const entity2 = null;

        const compareResult1 = service.compareTrainingStatus(entity1, entity2);
        const compareResult2 = service.compareTrainingStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '053bf031-a284-46fd-8586-1a656a154cf3' };
        const entity2 = { id: 'd8ce37b3-f820-49e1-980b-7132772e61a7' };

        const compareResult1 = service.compareTrainingStatus(entity1, entity2);
        const compareResult2 = service.compareTrainingStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '053bf031-a284-46fd-8586-1a656a154cf3' };
        const entity2 = { id: '053bf031-a284-46fd-8586-1a656a154cf3' };

        const compareResult1 = service.compareTrainingStatus(entity1, entity2);
        const compareResult2 = service.compareTrainingStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
