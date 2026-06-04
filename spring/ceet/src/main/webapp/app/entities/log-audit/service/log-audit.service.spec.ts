import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ILogAudit } from '../log-audit.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../log-audit.test-samples';

import { LogAuditService, RestLogAudit } from './log-audit.service';

const requireRestSample: RestLogAudit = {
  ...sampleWithRequiredData,
  dateAudit: sampleWithRequiredData.dateAudit?.toJSON(),
};

describe('LogAudit Service', () => {
  let service: LogAuditService;
  let httpMock: HttpTestingController;
  let expectedResult: ILogAudit | ILogAudit[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LogAuditService);
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

    it('should create a LogAudit', () => {
      const logAudit = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(logAudit).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LogAudit', () => {
      const logAudit = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(logAudit).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LogAudit', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LogAudit', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LogAudit', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addLogAuditToCollectionIfMissing', () => {
      it('should add a LogAudit to an empty array', () => {
        const logAudit: ILogAudit = sampleWithRequiredData;
        expectedResult = service.addLogAuditToCollectionIfMissing([], logAudit);
        expect(expectedResult).toEqual([logAudit]);
      });

      it('should not add a LogAudit to an array that contains it', () => {
        const logAudit: ILogAudit = sampleWithRequiredData;
        const logAuditCollection: ILogAudit[] = [
          {
            ...logAudit,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLogAuditToCollectionIfMissing(logAuditCollection, logAudit);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LogAudit to an array that doesn't contain it", () => {
        const logAudit: ILogAudit = sampleWithRequiredData;
        const logAuditCollection: ILogAudit[] = [sampleWithPartialData];
        expectedResult = service.addLogAuditToCollectionIfMissing(logAuditCollection, logAudit);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logAudit);
      });

      it('should add only unique LogAudit to an array', () => {
        const logAuditArray: ILogAudit[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const logAuditCollection: ILogAudit[] = [sampleWithRequiredData];
        expectedResult = service.addLogAuditToCollectionIfMissing(logAuditCollection, ...logAuditArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logAudit: ILogAudit = sampleWithRequiredData;
        const logAudit2: ILogAudit = sampleWithPartialData;
        expectedResult = service.addLogAuditToCollectionIfMissing([], logAudit, logAudit2);
        expect(expectedResult).toEqual([logAudit, logAudit2]);
      });

      it('should accept null and undefined values', () => {
        const logAudit: ILogAudit = sampleWithRequiredData;
        expectedResult = service.addLogAuditToCollectionIfMissing([], null, logAudit, undefined);
        expect(expectedResult).toEqual([logAudit]);
      });

      it('should return initial array if no LogAudit is added', () => {
        const logAuditCollection: ILogAudit[] = [sampleWithRequiredData];
        expectedResult = service.addLogAuditToCollectionIfMissing(logAuditCollection, undefined, null);
        expect(expectedResult).toEqual(logAuditCollection);
      });
    });

    describe('compareLogAudit', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLogAudit(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '71eef2e7-cb01-4349-bad7-c9a369beb19a' };
        const entity2 = null;

        const compareResult1 = service.compareLogAudit(entity1, entity2);
        const compareResult2 = service.compareLogAudit(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '71eef2e7-cb01-4349-bad7-c9a369beb19a' };
        const entity2 = { id: 'f5e5d37d-e689-46a9-ae4c-92ac59e96ef3' };

        const compareResult1 = service.compareLogAudit(entity1, entity2);
        const compareResult2 = service.compareLogAudit(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '71eef2e7-cb01-4349-bad7-c9a369beb19a' };
        const entity2 = { id: '71eef2e7-cb01-4349-bad7-c9a369beb19a' };

        const compareResult1 = service.compareLogAudit(entity1, entity2);
        const compareResult2 = service.compareLogAudit(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
