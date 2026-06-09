import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IQuarterSchedule } from '../quarter-schedule.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../quarter-schedule.test-samples';

import { QuarterScheduleService } from './quarter-schedule.service';

const requireRestSample: IQuarterSchedule = {
  ...sampleWithRequiredData,
};

describe('QuarterSchedule Service', () => {
  let service: QuarterScheduleService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuarterSchedule | IQuarterSchedule[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(QuarterScheduleService);
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

    it('should create a QuarterSchedule', () => {
      const quarterSchedule = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(quarterSchedule).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a QuarterSchedule', () => {
      const quarterSchedule = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(quarterSchedule).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a QuarterSchedule', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of QuarterSchedule', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a QuarterSchedule', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addQuarterScheduleToCollectionIfMissing', () => {
      it('should add a QuarterSchedule to an empty array', () => {
        const quarterSchedule: IQuarterSchedule = sampleWithRequiredData;
        expectedResult = service.addQuarterScheduleToCollectionIfMissing([], quarterSchedule);
        expect(expectedResult).toEqual([quarterSchedule]);
      });

      it('should not add a QuarterSchedule to an array that contains it', () => {
        const quarterSchedule: IQuarterSchedule = sampleWithRequiredData;
        const quarterScheduleCollection: IQuarterSchedule[] = [
          {
            ...quarterSchedule,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuarterScheduleToCollectionIfMissing(quarterScheduleCollection, quarterSchedule);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a QuarterSchedule to an array that doesn't contain it", () => {
        const quarterSchedule: IQuarterSchedule = sampleWithRequiredData;
        const quarterScheduleCollection: IQuarterSchedule[] = [sampleWithPartialData];
        expectedResult = service.addQuarterScheduleToCollectionIfMissing(quarterScheduleCollection, quarterSchedule);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quarterSchedule);
      });

      it('should add only unique QuarterSchedule to an array', () => {
        const quarterScheduleArray: IQuarterSchedule[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const quarterScheduleCollection: IQuarterSchedule[] = [sampleWithRequiredData];
        expectedResult = service.addQuarterScheduleToCollectionIfMissing(quarterScheduleCollection, ...quarterScheduleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quarterSchedule: IQuarterSchedule = sampleWithRequiredData;
        const quarterSchedule2: IQuarterSchedule = sampleWithPartialData;
        expectedResult = service.addQuarterScheduleToCollectionIfMissing([], quarterSchedule, quarterSchedule2);
        expect(expectedResult).toEqual([quarterSchedule, quarterSchedule2]);
      });

      it('should accept null and undefined values', () => {
        const quarterSchedule: IQuarterSchedule = sampleWithRequiredData;
        expectedResult = service.addQuarterScheduleToCollectionIfMissing([], null, quarterSchedule, undefined);
        expect(expectedResult).toEqual([quarterSchedule]);
      });

      it('should return initial array if no QuarterSchedule is added', () => {
        const quarterScheduleCollection: IQuarterSchedule[] = [sampleWithRequiredData];
        expectedResult = service.addQuarterScheduleToCollectionIfMissing(quarterScheduleCollection, undefined, null);
        expect(expectedResult).toEqual(quarterScheduleCollection);
      });
    });

    describe('compareQuarterSchedule', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuarterSchedule(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' };
        const entity2 = null;

        const compareResult1 = service.compareQuarterSchedule(entity1, entity2);
        const compareResult2 = service.compareQuarterSchedule(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' };
        const entity2 = { id: '6d26cf65-14a3-450e-b171-5321deb013d8' };

        const compareResult1 = service.compareQuarterSchedule(entity1, entity2);
        const compareResult2 = service.compareQuarterSchedule(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' };
        const entity2 = { id: 'cb8a58fb-ddc6-4c56-9542-9f8e60b8e090' };

        const compareResult1 = service.compareQuarterSchedule(entity1, entity2);
        const compareResult2 = service.compareQuarterSchedule(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
