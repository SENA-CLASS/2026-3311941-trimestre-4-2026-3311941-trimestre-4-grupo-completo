import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IWorkingDayCourse } from '../working-day-course.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../working-day-course.test-samples';

import { WorkingDayCourseService } from './working-day-course.service';

const requireRestSample: IWorkingDayCourse = {
  ...sampleWithRequiredData,
};

describe('WorkingDayCourse Service', () => {
  let service: WorkingDayCourseService;
  let httpMock: HttpTestingController;
  let expectedResult: IWorkingDayCourse | IWorkingDayCourse[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(WorkingDayCourseService);
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

    it('should create a WorkingDayCourse', () => {
      const workingDayCourse = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(workingDayCourse).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WorkingDayCourse', () => {
      const workingDayCourse = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(workingDayCourse).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WorkingDayCourse', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WorkingDayCourse', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WorkingDayCourse', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addWorkingDayCourseToCollectionIfMissing', () => {
      it('should add a WorkingDayCourse to an empty array', () => {
        const workingDayCourse: IWorkingDayCourse = sampleWithRequiredData;
        expectedResult = service.addWorkingDayCourseToCollectionIfMissing([], workingDayCourse);
        expect(expectedResult).toEqual([workingDayCourse]);
      });

      it('should not add a WorkingDayCourse to an array that contains it', () => {
        const workingDayCourse: IWorkingDayCourse = sampleWithRequiredData;
        const workingDayCourseCollection: IWorkingDayCourse[] = [
          {
            ...workingDayCourse,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWorkingDayCourseToCollectionIfMissing(workingDayCourseCollection, workingDayCourse);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkingDayCourse to an array that doesn't contain it", () => {
        const workingDayCourse: IWorkingDayCourse = sampleWithRequiredData;
        const workingDayCourseCollection: IWorkingDayCourse[] = [sampleWithPartialData];
        expectedResult = service.addWorkingDayCourseToCollectionIfMissing(workingDayCourseCollection, workingDayCourse);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workingDayCourse);
      });

      it('should add only unique WorkingDayCourse to an array', () => {
        const workingDayCourseArray: IWorkingDayCourse[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const workingDayCourseCollection: IWorkingDayCourse[] = [sampleWithRequiredData];
        expectedResult = service.addWorkingDayCourseToCollectionIfMissing(workingDayCourseCollection, ...workingDayCourseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const workingDayCourse: IWorkingDayCourse = sampleWithRequiredData;
        const workingDayCourse2: IWorkingDayCourse = sampleWithPartialData;
        expectedResult = service.addWorkingDayCourseToCollectionIfMissing([], workingDayCourse, workingDayCourse2);
        expect(expectedResult).toEqual([workingDayCourse, workingDayCourse2]);
      });

      it('should accept null and undefined values', () => {
        const workingDayCourse: IWorkingDayCourse = sampleWithRequiredData;
        expectedResult = service.addWorkingDayCourseToCollectionIfMissing([], null, workingDayCourse, undefined);
        expect(expectedResult).toEqual([workingDayCourse]);
      });

      it('should return initial array if no WorkingDayCourse is added', () => {
        const workingDayCourseCollection: IWorkingDayCourse[] = [sampleWithRequiredData];
        expectedResult = service.addWorkingDayCourseToCollectionIfMissing(workingDayCourseCollection, undefined, null);
        expect(expectedResult).toEqual(workingDayCourseCollection);
      });
    });

    describe('compareWorkingDayCourse', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWorkingDayCourse(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
        const entity2 = null;

        const compareResult1 = service.compareWorkingDayCourse(entity1, entity2);
        const compareResult2 = service.compareWorkingDayCourse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
        const entity2 = { id: '647799fc-3023-41ef-914a-650d7703fb02' };

        const compareResult1 = service.compareWorkingDayCourse(entity1, entity2);
        const compareResult2 = service.compareWorkingDayCourse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };
        const entity2 = { id: '3317990a-8fb1-4654-821f-70185269b7b0' };

        const compareResult1 = service.compareWorkingDayCourse(entity1, entity2);
        const compareResult2 = service.compareWorkingDayCourse(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
