import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ICourseTrimester } from '../course-trimester.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../course-trimester.test-samples';

import { CourseTrimesterService } from './course-trimester.service';

const requireRestSample: ICourseTrimester = {
  ...sampleWithRequiredData,
};

describe('CourseTrimester Service', () => {
  let service: CourseTrimesterService;
  let httpMock: HttpTestingController;
  let expectedResult: ICourseTrimester | ICourseTrimester[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CourseTrimesterService);
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

    it('should create a CourseTrimester', () => {
      const courseTrimester = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(courseTrimester).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CourseTrimester', () => {
      const courseTrimester = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(courseTrimester).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CourseTrimester', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CourseTrimester', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CourseTrimester', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addCourseTrimesterToCollectionIfMissing', () => {
      it('should add a CourseTrimester to an empty array', () => {
        const courseTrimester: ICourseTrimester = sampleWithRequiredData;
        expectedResult = service.addCourseTrimesterToCollectionIfMissing([], courseTrimester);
        expect(expectedResult).toEqual([courseTrimester]);
      });

      it('should not add a CourseTrimester to an array that contains it', () => {
        const courseTrimester: ICourseTrimester = sampleWithRequiredData;
        const courseTrimesterCollection: ICourseTrimester[] = [
          {
            ...courseTrimester,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCourseTrimesterToCollectionIfMissing(courseTrimesterCollection, courseTrimester);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CourseTrimester to an array that doesn't contain it", () => {
        const courseTrimester: ICourseTrimester = sampleWithRequiredData;
        const courseTrimesterCollection: ICourseTrimester[] = [sampleWithPartialData];
        expectedResult = service.addCourseTrimesterToCollectionIfMissing(courseTrimesterCollection, courseTrimester);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(courseTrimester);
      });

      it('should add only unique CourseTrimester to an array', () => {
        const courseTrimesterArray: ICourseTrimester[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const courseTrimesterCollection: ICourseTrimester[] = [sampleWithRequiredData];
        expectedResult = service.addCourseTrimesterToCollectionIfMissing(courseTrimesterCollection, ...courseTrimesterArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const courseTrimester: ICourseTrimester = sampleWithRequiredData;
        const courseTrimester2: ICourseTrimester = sampleWithPartialData;
        expectedResult = service.addCourseTrimesterToCollectionIfMissing([], courseTrimester, courseTrimester2);
        expect(expectedResult).toEqual([courseTrimester, courseTrimester2]);
      });

      it('should accept null and undefined values', () => {
        const courseTrimester: ICourseTrimester = sampleWithRequiredData;
        expectedResult = service.addCourseTrimesterToCollectionIfMissing([], null, courseTrimester, undefined);
        expect(expectedResult).toEqual([courseTrimester]);
      });

      it('should return initial array if no CourseTrimester is added', () => {
        const courseTrimesterCollection: ICourseTrimester[] = [sampleWithRequiredData];
        expectedResult = service.addCourseTrimesterToCollectionIfMissing(courseTrimesterCollection, undefined, null);
        expect(expectedResult).toEqual(courseTrimesterCollection);
      });
    });

    describe('compareCourseTrimester', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCourseTrimester(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
        const entity2 = null;

        const compareResult1 = service.compareCourseTrimester(entity1, entity2);
        const compareResult2 = service.compareCourseTrimester(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
        const entity2 = { id: '160fb1c3-2c69-4184-ab10-636c5d1d30b8' };

        const compareResult1 = service.compareCourseTrimester(entity1, entity2);
        const compareResult2 = service.compareCourseTrimester(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };
        const entity2 = { id: '87627c1c-a756-41da-8baf-2032937c03d7' };

        const compareResult1 = service.compareCourseTrimester(entity1, entity2);
        const compareResult2 = service.compareCourseTrimester(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
