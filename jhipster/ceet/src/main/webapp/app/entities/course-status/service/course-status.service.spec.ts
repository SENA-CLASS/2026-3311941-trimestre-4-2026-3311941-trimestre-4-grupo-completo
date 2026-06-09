import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ICourseStatus } from '../course-status.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../course-status.test-samples';

import { CourseStatusService } from './course-status.service';

const requireRestSample: ICourseStatus = {
  ...sampleWithRequiredData,
};

describe('CourseStatus Service', () => {
  let service: CourseStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: ICourseStatus | ICourseStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CourseStatusService);
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

    it('should create a CourseStatus', () => {
      const courseStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(courseStatus).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CourseStatus', () => {
      const courseStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(courseStatus).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CourseStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CourseStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CourseStatus', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addCourseStatusToCollectionIfMissing', () => {
      it('should add a CourseStatus to an empty array', () => {
        const courseStatus: ICourseStatus = sampleWithRequiredData;
        expectedResult = service.addCourseStatusToCollectionIfMissing([], courseStatus);
        expect(expectedResult).toEqual([courseStatus]);
      });

      it('should not add a CourseStatus to an array that contains it', () => {
        const courseStatus: ICourseStatus = sampleWithRequiredData;
        const courseStatusCollection: ICourseStatus[] = [
          {
            ...courseStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCourseStatusToCollectionIfMissing(courseStatusCollection, courseStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CourseStatus to an array that doesn't contain it", () => {
        const courseStatus: ICourseStatus = sampleWithRequiredData;
        const courseStatusCollection: ICourseStatus[] = [sampleWithPartialData];
        expectedResult = service.addCourseStatusToCollectionIfMissing(courseStatusCollection, courseStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(courseStatus);
      });

      it('should add only unique CourseStatus to an array', () => {
        const courseStatusArray: ICourseStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const courseStatusCollection: ICourseStatus[] = [sampleWithRequiredData];
        expectedResult = service.addCourseStatusToCollectionIfMissing(courseStatusCollection, ...courseStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const courseStatus: ICourseStatus = sampleWithRequiredData;
        const courseStatus2: ICourseStatus = sampleWithPartialData;
        expectedResult = service.addCourseStatusToCollectionIfMissing([], courseStatus, courseStatus2);
        expect(expectedResult).toEqual([courseStatus, courseStatus2]);
      });

      it('should accept null and undefined values', () => {
        const courseStatus: ICourseStatus = sampleWithRequiredData;
        expectedResult = service.addCourseStatusToCollectionIfMissing([], null, courseStatus, undefined);
        expect(expectedResult).toEqual([courseStatus]);
      });

      it('should return initial array if no CourseStatus is added', () => {
        const courseStatusCollection: ICourseStatus[] = [sampleWithRequiredData];
        expectedResult = service.addCourseStatusToCollectionIfMissing(courseStatusCollection, undefined, null);
        expect(expectedResult).toEqual(courseStatusCollection);
      });
    });

    describe('compareCourseStatus', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCourseStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' };
        const entity2 = null;

        const compareResult1 = service.compareCourseStatus(entity1, entity2);
        const compareResult2 = service.compareCourseStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' };
        const entity2 = { id: 'ffe39020-1c0d-4cb1-a934-16944daffc5b' };

        const compareResult1 = service.compareCourseStatus(entity1, entity2);
        const compareResult2 = service.compareCourseStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' };
        const entity2 = { id: '10d644f6-f194-440a-bbab-b099a4c4d9fb' };

        const compareResult1 = service.compareCourseStatus(entity1, entity2);
        const compareResult2 = service.compareCourseStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
