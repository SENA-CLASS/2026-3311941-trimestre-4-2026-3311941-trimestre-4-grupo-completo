import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ICheckListCourse } from '../check-list-course.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../check-list-course.test-samples';

import { CheckListCourseService } from './check-list-course.service';

const requireRestSample: ICheckListCourse = {
  ...sampleWithRequiredData,
};

describe('CheckListCourse Service', () => {
  let service: CheckListCourseService;
  let httpMock: HttpTestingController;
  let expectedResult: ICheckListCourse | ICheckListCourse[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CheckListCourseService);
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

    it('should create a CheckListCourse', () => {
      const checkListCourse = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(checkListCourse).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CheckListCourse', () => {
      const checkListCourse = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(checkListCourse).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CheckListCourse', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CheckListCourse', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CheckListCourse', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addCheckListCourseToCollectionIfMissing', () => {
      it('should add a CheckListCourse to an empty array', () => {
        const checkListCourse: ICheckListCourse = sampleWithRequiredData;
        expectedResult = service.addCheckListCourseToCollectionIfMissing([], checkListCourse);
        expect(expectedResult).toEqual([checkListCourse]);
      });

      it('should not add a CheckListCourse to an array that contains it', () => {
        const checkListCourse: ICheckListCourse = sampleWithRequiredData;
        const checkListCourseCollection: ICheckListCourse[] = [
          {
            ...checkListCourse,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCheckListCourseToCollectionIfMissing(checkListCourseCollection, checkListCourse);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CheckListCourse to an array that doesn't contain it", () => {
        const checkListCourse: ICheckListCourse = sampleWithRequiredData;
        const checkListCourseCollection: ICheckListCourse[] = [sampleWithPartialData];
        expectedResult = service.addCheckListCourseToCollectionIfMissing(checkListCourseCollection, checkListCourse);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(checkListCourse);
      });

      it('should add only unique CheckListCourse to an array', () => {
        const checkListCourseArray: ICheckListCourse[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const checkListCourseCollection: ICheckListCourse[] = [sampleWithRequiredData];
        expectedResult = service.addCheckListCourseToCollectionIfMissing(checkListCourseCollection, ...checkListCourseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const checkListCourse: ICheckListCourse = sampleWithRequiredData;
        const checkListCourse2: ICheckListCourse = sampleWithPartialData;
        expectedResult = service.addCheckListCourseToCollectionIfMissing([], checkListCourse, checkListCourse2);
        expect(expectedResult).toEqual([checkListCourse, checkListCourse2]);
      });

      it('should accept null and undefined values', () => {
        const checkListCourse: ICheckListCourse = sampleWithRequiredData;
        expectedResult = service.addCheckListCourseToCollectionIfMissing([], null, checkListCourse, undefined);
        expect(expectedResult).toEqual([checkListCourse]);
      });

      it('should return initial array if no CheckListCourse is added', () => {
        const checkListCourseCollection: ICheckListCourse[] = [sampleWithRequiredData];
        expectedResult = service.addCheckListCourseToCollectionIfMissing(checkListCourseCollection, undefined, null);
        expect(expectedResult).toEqual(checkListCourseCollection);
      });
    });

    describe('compareCheckListCourse', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCheckListCourse(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'fe0e76c2-b0cd-455f-82aa-49d4fdb3fd1e' };
        const entity2 = null;

        const compareResult1 = service.compareCheckListCourse(entity1, entity2);
        const compareResult2 = service.compareCheckListCourse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'fe0e76c2-b0cd-455f-82aa-49d4fdb3fd1e' };
        const entity2 = { id: 'b3f905ac-b319-4b8f-b56f-0255eda3d659' };

        const compareResult1 = service.compareCheckListCourse(entity1, entity2);
        const compareResult2 = service.compareCheckListCourse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'fe0e76c2-b0cd-455f-82aa-49d4fdb3fd1e' };
        const entity2 = { id: 'fe0e76c2-b0cd-455f-82aa-49d4fdb3fd1e' };

        const compareResult1 = service.compareCheckListCourse(entity1, entity2);
        const compareResult2 = service.compareCheckListCourse(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
