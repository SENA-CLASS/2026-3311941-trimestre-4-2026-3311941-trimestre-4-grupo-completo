import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IScheduleVersion } from '../schedule-version.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../schedule-version.test-samples';

import { ScheduleVersionService } from './schedule-version.service';

const requireRestSample: IScheduleVersion = {
  ...sampleWithRequiredData,
};

describe('ScheduleVersion Service', () => {
  let service: ScheduleVersionService;
  let httpMock: HttpTestingController;
  let expectedResult: IScheduleVersion | IScheduleVersion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ScheduleVersionService);
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

    it('should create a ScheduleVersion', () => {
      const scheduleVersion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(scheduleVersion).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ScheduleVersion', () => {
      const scheduleVersion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(scheduleVersion).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ScheduleVersion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ScheduleVersion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ScheduleVersion', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addScheduleVersionToCollectionIfMissing', () => {
      it('should add a ScheduleVersion to an empty array', () => {
        const scheduleVersion: IScheduleVersion = sampleWithRequiredData;
        expectedResult = service.addScheduleVersionToCollectionIfMissing([], scheduleVersion);
        expect(expectedResult).toEqual([scheduleVersion]);
      });

      it('should not add a ScheduleVersion to an array that contains it', () => {
        const scheduleVersion: IScheduleVersion = sampleWithRequiredData;
        const scheduleVersionCollection: IScheduleVersion[] = [
          {
            ...scheduleVersion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addScheduleVersionToCollectionIfMissing(scheduleVersionCollection, scheduleVersion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ScheduleVersion to an array that doesn't contain it", () => {
        const scheduleVersion: IScheduleVersion = sampleWithRequiredData;
        const scheduleVersionCollection: IScheduleVersion[] = [sampleWithPartialData];
        expectedResult = service.addScheduleVersionToCollectionIfMissing(scheduleVersionCollection, scheduleVersion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(scheduleVersion);
      });

      it('should add only unique ScheduleVersion to an array', () => {
        const scheduleVersionArray: IScheduleVersion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const scheduleVersionCollection: IScheduleVersion[] = [sampleWithRequiredData];
        expectedResult = service.addScheduleVersionToCollectionIfMissing(scheduleVersionCollection, ...scheduleVersionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const scheduleVersion: IScheduleVersion = sampleWithRequiredData;
        const scheduleVersion2: IScheduleVersion = sampleWithPartialData;
        expectedResult = service.addScheduleVersionToCollectionIfMissing([], scheduleVersion, scheduleVersion2);
        expect(expectedResult).toEqual([scheduleVersion, scheduleVersion2]);
      });

      it('should accept null and undefined values', () => {
        const scheduleVersion: IScheduleVersion = sampleWithRequiredData;
        expectedResult = service.addScheduleVersionToCollectionIfMissing([], null, scheduleVersion, undefined);
        expect(expectedResult).toEqual([scheduleVersion]);
      });

      it('should return initial array if no ScheduleVersion is added', () => {
        const scheduleVersionCollection: IScheduleVersion[] = [sampleWithRequiredData];
        expectedResult = service.addScheduleVersionToCollectionIfMissing(scheduleVersionCollection, undefined, null);
        expect(expectedResult).toEqual(scheduleVersionCollection);
      });
    });

    describe('compareScheduleVersion', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareScheduleVersion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' };
        const entity2 = null;

        const compareResult1 = service.compareScheduleVersion(entity1, entity2);
        const compareResult2 = service.compareScheduleVersion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' };
        const entity2 = { id: 'a7abaf4d-38ad-4254-b144-1421e43d3397' };

        const compareResult1 = service.compareScheduleVersion(entity1, entity2);
        const compareResult2 = service.compareScheduleVersion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' };
        const entity2 = { id: '92e0f35b-04d9-47d7-9946-bfa57a73f086' };

        const compareResult1 = service.compareScheduleVersion(entity1, entity2);
        const compareResult2 = service.compareScheduleVersion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
