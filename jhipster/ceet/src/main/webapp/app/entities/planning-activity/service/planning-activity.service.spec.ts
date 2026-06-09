import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IPlanningActivity } from '../planning-activity.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../planning-activity.test-samples';

import { PlanningActivityService } from './planning-activity.service';

const requireRestSample: IPlanningActivity = {
  ...sampleWithRequiredData,
};

describe('PlanningActivity Service', () => {
  let service: PlanningActivityService;
  let httpMock: HttpTestingController;
  let expectedResult: IPlanningActivity | IPlanningActivity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(PlanningActivityService);
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

    it('should create a PlanningActivity', () => {
      const planningActivity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(planningActivity).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PlanningActivity', () => {
      const planningActivity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(planningActivity).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PlanningActivity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PlanningActivity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PlanningActivity', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addPlanningActivityToCollectionIfMissing', () => {
      it('should add a PlanningActivity to an empty array', () => {
        const planningActivity: IPlanningActivity = sampleWithRequiredData;
        expectedResult = service.addPlanningActivityToCollectionIfMissing([], planningActivity);
        expect(expectedResult).toEqual([planningActivity]);
      });

      it('should not add a PlanningActivity to an array that contains it', () => {
        const planningActivity: IPlanningActivity = sampleWithRequiredData;
        const planningActivityCollection: IPlanningActivity[] = [
          {
            ...planningActivity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPlanningActivityToCollectionIfMissing(planningActivityCollection, planningActivity);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PlanningActivity to an array that doesn't contain it", () => {
        const planningActivity: IPlanningActivity = sampleWithRequiredData;
        const planningActivityCollection: IPlanningActivity[] = [sampleWithPartialData];
        expectedResult = service.addPlanningActivityToCollectionIfMissing(planningActivityCollection, planningActivity);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planningActivity);
      });

      it('should add only unique PlanningActivity to an array', () => {
        const planningActivityArray: IPlanningActivity[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const planningActivityCollection: IPlanningActivity[] = [sampleWithRequiredData];
        expectedResult = service.addPlanningActivityToCollectionIfMissing(planningActivityCollection, ...planningActivityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const planningActivity: IPlanningActivity = sampleWithRequiredData;
        const planningActivity2: IPlanningActivity = sampleWithPartialData;
        expectedResult = service.addPlanningActivityToCollectionIfMissing([], planningActivity, planningActivity2);
        expect(expectedResult).toEqual([planningActivity, planningActivity2]);
      });

      it('should accept null and undefined values', () => {
        const planningActivity: IPlanningActivity = sampleWithRequiredData;
        expectedResult = service.addPlanningActivityToCollectionIfMissing([], null, planningActivity, undefined);
        expect(expectedResult).toEqual([planningActivity]);
      });

      it('should return initial array if no PlanningActivity is added', () => {
        const planningActivityCollection: IPlanningActivity[] = [sampleWithRequiredData];
        expectedResult = service.addPlanningActivityToCollectionIfMissing(planningActivityCollection, undefined, null);
        expect(expectedResult).toEqual(planningActivityCollection);
      });
    });

    describe('comparePlanningActivity', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePlanningActivity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'e33c8a7c-2d1d-41a5-b595-8ae92ad792d5' };
        const entity2 = null;

        const compareResult1 = service.comparePlanningActivity(entity1, entity2);
        const compareResult2 = service.comparePlanningActivity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'e33c8a7c-2d1d-41a5-b595-8ae92ad792d5' };
        const entity2 = { id: '62ae726d-e1bd-43c1-b6e1-2b81a88a5872' };

        const compareResult1 = service.comparePlanningActivity(entity1, entity2);
        const compareResult2 = service.comparePlanningActivity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'e33c8a7c-2d1d-41a5-b595-8ae92ad792d5' };
        const entity2 = { id: 'e33c8a7c-2d1d-41a5-b595-8ae92ad792d5' };

        const compareResult1 = service.comparePlanningActivity(entity1, entity2);
        const compareResult2 = service.comparePlanningActivity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
