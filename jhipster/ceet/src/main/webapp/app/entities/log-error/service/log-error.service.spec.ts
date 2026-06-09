import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ILogError } from '../log-error.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../log-error.test-samples';

import { LogErrorService, RestLogError } from './log-error.service';

const requireRestSample: RestLogError = {
  ...sampleWithRequiredData,
  dateError: sampleWithRequiredData.dateError?.toJSON(),
};

describe('LogError Service', () => {
  let service: LogErrorService;
  let httpMock: HttpTestingController;
  let expectedResult: ILogError | ILogError[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LogErrorService);
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

    it('should create a LogError', () => {
      const logError = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(logError).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LogError', () => {
      const logError = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(logError).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LogError', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LogError', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LogError', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addLogErrorToCollectionIfMissing', () => {
      it('should add a LogError to an empty array', () => {
        const logError: ILogError = sampleWithRequiredData;
        expectedResult = service.addLogErrorToCollectionIfMissing([], logError);
        expect(expectedResult).toEqual([logError]);
      });

      it('should not add a LogError to an array that contains it', () => {
        const logError: ILogError = sampleWithRequiredData;
        const logErrorCollection: ILogError[] = [
          {
            ...logError,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLogErrorToCollectionIfMissing(logErrorCollection, logError);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LogError to an array that doesn't contain it", () => {
        const logError: ILogError = sampleWithRequiredData;
        const logErrorCollection: ILogError[] = [sampleWithPartialData];
        expectedResult = service.addLogErrorToCollectionIfMissing(logErrorCollection, logError);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logError);
      });

      it('should add only unique LogError to an array', () => {
        const logErrorArray: ILogError[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const logErrorCollection: ILogError[] = [sampleWithRequiredData];
        expectedResult = service.addLogErrorToCollectionIfMissing(logErrorCollection, ...logErrorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logError: ILogError = sampleWithRequiredData;
        const logError2: ILogError = sampleWithPartialData;
        expectedResult = service.addLogErrorToCollectionIfMissing([], logError, logError2);
        expect(expectedResult).toEqual([logError, logError2]);
      });

      it('should accept null and undefined values', () => {
        const logError: ILogError = sampleWithRequiredData;
        expectedResult = service.addLogErrorToCollectionIfMissing([], null, logError, undefined);
        expect(expectedResult).toEqual([logError]);
      });

      it('should return initial array if no LogError is added', () => {
        const logErrorCollection: ILogError[] = [sampleWithRequiredData];
        expectedResult = service.addLogErrorToCollectionIfMissing(logErrorCollection, undefined, null);
        expect(expectedResult).toEqual(logErrorCollection);
      });
    });

    describe('compareLogError', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLogError(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '86ed6f82-2f50-4460-81da-2d13f2ad36ef' };
        const entity2 = null;

        const compareResult1 = service.compareLogError(entity1, entity2);
        const compareResult2 = service.compareLogError(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '86ed6f82-2f50-4460-81da-2d13f2ad36ef' };
        const entity2 = { id: '5cc22e6b-06ac-42d0-a1ab-fed31ace05cd' };

        const compareResult1 = service.compareLogError(entity1, entity2);
        const compareResult2 = service.compareLogError(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '86ed6f82-2f50-4460-81da-2d13f2ad36ef' };
        const entity2 = { id: '86ed6f82-2f50-4460-81da-2d13f2ad36ef' };

        const compareResult1 = service.compareLogError(entity1, entity2);
        const compareResult2 = service.compareLogError(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
