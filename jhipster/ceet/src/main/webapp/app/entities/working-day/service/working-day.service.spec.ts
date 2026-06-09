import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IWorkingDay } from '../working-day.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../working-day.test-samples';

import { WorkingDayService } from './working-day.service';

const requireRestSample: IWorkingDay = {
  ...sampleWithRequiredData,
};

describe('WorkingDay Service', () => {
  let service: WorkingDayService;
  let httpMock: HttpTestingController;
  let expectedResult: IWorkingDay | IWorkingDay[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(WorkingDayService);
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

    it('should create a WorkingDay', () => {
      const workingDay = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(workingDay).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WorkingDay', () => {
      const workingDay = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(workingDay).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WorkingDay', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WorkingDay', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WorkingDay', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addWorkingDayToCollectionIfMissing', () => {
      it('should add a WorkingDay to an empty array', () => {
        const workingDay: IWorkingDay = sampleWithRequiredData;
        expectedResult = service.addWorkingDayToCollectionIfMissing([], workingDay);
        expect(expectedResult).toEqual([workingDay]);
      });

      it('should not add a WorkingDay to an array that contains it', () => {
        const workingDay: IWorkingDay = sampleWithRequiredData;
        const workingDayCollection: IWorkingDay[] = [
          {
            ...workingDay,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWorkingDayToCollectionIfMissing(workingDayCollection, workingDay);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkingDay to an array that doesn't contain it", () => {
        const workingDay: IWorkingDay = sampleWithRequiredData;
        const workingDayCollection: IWorkingDay[] = [sampleWithPartialData];
        expectedResult = service.addWorkingDayToCollectionIfMissing(workingDayCollection, workingDay);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workingDay);
      });

      it('should add only unique WorkingDay to an array', () => {
        const workingDayArray: IWorkingDay[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const workingDayCollection: IWorkingDay[] = [sampleWithRequiredData];
        expectedResult = service.addWorkingDayToCollectionIfMissing(workingDayCollection, ...workingDayArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const workingDay: IWorkingDay = sampleWithRequiredData;
        const workingDay2: IWorkingDay = sampleWithPartialData;
        expectedResult = service.addWorkingDayToCollectionIfMissing([], workingDay, workingDay2);
        expect(expectedResult).toEqual([workingDay, workingDay2]);
      });

      it('should accept null and undefined values', () => {
        const workingDay: IWorkingDay = sampleWithRequiredData;
        expectedResult = service.addWorkingDayToCollectionIfMissing([], null, workingDay, undefined);
        expect(expectedResult).toEqual([workingDay]);
      });

      it('should return initial array if no WorkingDay is added', () => {
        const workingDayCollection: IWorkingDay[] = [sampleWithRequiredData];
        expectedResult = service.addWorkingDayToCollectionIfMissing(workingDayCollection, undefined, null);
        expect(expectedResult).toEqual(workingDayCollection);
      });
    });

    describe('compareWorkingDay', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWorkingDay(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'a0aff8e9-f539-4c17-817e-bbf8dfab13f4' };
        const entity2 = null;

        const compareResult1 = service.compareWorkingDay(entity1, entity2);
        const compareResult2 = service.compareWorkingDay(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'a0aff8e9-f539-4c17-817e-bbf8dfab13f4' };
        const entity2 = { id: 'fddad6dd-031d-41fc-8909-01f8ec6a7bc0' };

        const compareResult1 = service.compareWorkingDay(entity1, entity2);
        const compareResult2 = service.compareWorkingDay(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'a0aff8e9-f539-4c17-817e-bbf8dfab13f4' };
        const entity2 = { id: 'a0aff8e9-f539-4c17-817e-bbf8dfab13f4' };

        const compareResult1 = service.compareWorkingDay(entity1, entity2);
        const compareResult2 = service.compareWorkingDay(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
