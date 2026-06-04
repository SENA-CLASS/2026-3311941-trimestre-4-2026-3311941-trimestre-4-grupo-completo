import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IBoundingSchedule } from '../bounding-schedule.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../bounding-schedule.test-samples';

import { BoundingScheduleService } from './bounding-schedule.service';

const requireRestSample: IBoundingSchedule = {
  ...sampleWithRequiredData,
};

describe('BoundingSchedule Service', () => {
  let service: BoundingScheduleService;
  let httpMock: HttpTestingController;
  let expectedResult: IBoundingSchedule | IBoundingSchedule[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(BoundingScheduleService);
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

    it('should create a BoundingSchedule', () => {
      const boundingSchedule = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(boundingSchedule).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BoundingSchedule', () => {
      const boundingSchedule = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(boundingSchedule).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BoundingSchedule', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BoundingSchedule', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BoundingSchedule', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addBoundingScheduleToCollectionIfMissing', () => {
      it('should add a BoundingSchedule to an empty array', () => {
        const boundingSchedule: IBoundingSchedule = sampleWithRequiredData;
        expectedResult = service.addBoundingScheduleToCollectionIfMissing([], boundingSchedule);
        expect(expectedResult).toEqual([boundingSchedule]);
      });

      it('should not add a BoundingSchedule to an array that contains it', () => {
        const boundingSchedule: IBoundingSchedule = sampleWithRequiredData;
        const boundingScheduleCollection: IBoundingSchedule[] = [
          {
            ...boundingSchedule,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBoundingScheduleToCollectionIfMissing(boundingScheduleCollection, boundingSchedule);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BoundingSchedule to an array that doesn't contain it", () => {
        const boundingSchedule: IBoundingSchedule = sampleWithRequiredData;
        const boundingScheduleCollection: IBoundingSchedule[] = [sampleWithPartialData];
        expectedResult = service.addBoundingScheduleToCollectionIfMissing(boundingScheduleCollection, boundingSchedule);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(boundingSchedule);
      });

      it('should add only unique BoundingSchedule to an array', () => {
        const boundingScheduleArray: IBoundingSchedule[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const boundingScheduleCollection: IBoundingSchedule[] = [sampleWithRequiredData];
        expectedResult = service.addBoundingScheduleToCollectionIfMissing(boundingScheduleCollection, ...boundingScheduleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const boundingSchedule: IBoundingSchedule = sampleWithRequiredData;
        const boundingSchedule2: IBoundingSchedule = sampleWithPartialData;
        expectedResult = service.addBoundingScheduleToCollectionIfMissing([], boundingSchedule, boundingSchedule2);
        expect(expectedResult).toEqual([boundingSchedule, boundingSchedule2]);
      });

      it('should accept null and undefined values', () => {
        const boundingSchedule: IBoundingSchedule = sampleWithRequiredData;
        expectedResult = service.addBoundingScheduleToCollectionIfMissing([], null, boundingSchedule, undefined);
        expect(expectedResult).toEqual([boundingSchedule]);
      });

      it('should return initial array if no BoundingSchedule is added', () => {
        const boundingScheduleCollection: IBoundingSchedule[] = [sampleWithRequiredData];
        expectedResult = service.addBoundingScheduleToCollectionIfMissing(boundingScheduleCollection, undefined, null);
        expect(expectedResult).toEqual(boundingScheduleCollection);
      });
    });

    describe('compareBoundingSchedule', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBoundingSchedule(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '25fe1b48-f026-4b16-aaf7-f684c5be822a' };
        const entity2 = null;

        const compareResult1 = service.compareBoundingSchedule(entity1, entity2);
        const compareResult2 = service.compareBoundingSchedule(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '25fe1b48-f026-4b16-aaf7-f684c5be822a' };
        const entity2 = { id: '502b7832-a5bd-4dc7-abd9-e94d122443a9' };

        const compareResult1 = service.compareBoundingSchedule(entity1, entity2);
        const compareResult2 = service.compareBoundingSchedule(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '25fe1b48-f026-4b16-aaf7-f684c5be822a' };
        const entity2 = { id: '25fe1b48-f026-4b16-aaf7-f684c5be822a' };

        const compareResult1 = service.compareBoundingSchedule(entity1, entity2);
        const compareResult2 = service.compareBoundingSchedule(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
