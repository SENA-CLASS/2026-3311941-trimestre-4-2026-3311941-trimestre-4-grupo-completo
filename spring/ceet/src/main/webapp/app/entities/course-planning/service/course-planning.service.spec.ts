import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ICoursePlanning } from '../course-planning.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../course-planning.test-samples';

import { CoursePlanningService } from './course-planning.service';

const requireRestSample: ICoursePlanning = {
  ...sampleWithRequiredData,
};

describe('CoursePlanning Service', () => {
  let service: CoursePlanningService;
  let httpMock: HttpTestingController;
  let expectedResult: ICoursePlanning | ICoursePlanning[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CoursePlanningService);
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

    it('should create a CoursePlanning', () => {
      const coursePlanning = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(coursePlanning).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CoursePlanning', () => {
      const coursePlanning = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(coursePlanning).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CoursePlanning', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CoursePlanning', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CoursePlanning', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addCoursePlanningToCollectionIfMissing', () => {
      it('should add a CoursePlanning to an empty array', () => {
        const coursePlanning: ICoursePlanning = sampleWithRequiredData;
        expectedResult = service.addCoursePlanningToCollectionIfMissing([], coursePlanning);
        expect(expectedResult).toEqual([coursePlanning]);
      });

      it('should not add a CoursePlanning to an array that contains it', () => {
        const coursePlanning: ICoursePlanning = sampleWithRequiredData;
        const coursePlanningCollection: ICoursePlanning[] = [
          {
            ...coursePlanning,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCoursePlanningToCollectionIfMissing(coursePlanningCollection, coursePlanning);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CoursePlanning to an array that doesn't contain it", () => {
        const coursePlanning: ICoursePlanning = sampleWithRequiredData;
        const coursePlanningCollection: ICoursePlanning[] = [sampleWithPartialData];
        expectedResult = service.addCoursePlanningToCollectionIfMissing(coursePlanningCollection, coursePlanning);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(coursePlanning);
      });

      it('should add only unique CoursePlanning to an array', () => {
        const coursePlanningArray: ICoursePlanning[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const coursePlanningCollection: ICoursePlanning[] = [sampleWithRequiredData];
        expectedResult = service.addCoursePlanningToCollectionIfMissing(coursePlanningCollection, ...coursePlanningArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const coursePlanning: ICoursePlanning = sampleWithRequiredData;
        const coursePlanning2: ICoursePlanning = sampleWithPartialData;
        expectedResult = service.addCoursePlanningToCollectionIfMissing([], coursePlanning, coursePlanning2);
        expect(expectedResult).toEqual([coursePlanning, coursePlanning2]);
      });

      it('should accept null and undefined values', () => {
        const coursePlanning: ICoursePlanning = sampleWithRequiredData;
        expectedResult = service.addCoursePlanningToCollectionIfMissing([], null, coursePlanning, undefined);
        expect(expectedResult).toEqual([coursePlanning]);
      });

      it('should return initial array if no CoursePlanning is added', () => {
        const coursePlanningCollection: ICoursePlanning[] = [sampleWithRequiredData];
        expectedResult = service.addCoursePlanningToCollectionIfMissing(coursePlanningCollection, undefined, null);
        expect(expectedResult).toEqual(coursePlanningCollection);
      });
    });

    describe('compareCoursePlanning', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCoursePlanning(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '4b803aa8-fa56-47c2-883b-22da200d8885' };
        const entity2 = null;

        const compareResult1 = service.compareCoursePlanning(entity1, entity2);
        const compareResult2 = service.compareCoursePlanning(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '4b803aa8-fa56-47c2-883b-22da200d8885' };
        const entity2 = { id: '348f1f27-344e-4abf-8109-9ade6238651b' };

        const compareResult1 = service.compareCoursePlanning(entity1, entity2);
        const compareResult2 = service.compareCoursePlanning(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '4b803aa8-fa56-47c2-883b-22da200d8885' };
        const entity2 = { id: '4b803aa8-fa56-47c2-883b-22da200d8885' };

        const compareResult1 = service.compareCoursePlanning(entity1, entity2);
        const compareResult2 = service.compareCoursePlanning(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
