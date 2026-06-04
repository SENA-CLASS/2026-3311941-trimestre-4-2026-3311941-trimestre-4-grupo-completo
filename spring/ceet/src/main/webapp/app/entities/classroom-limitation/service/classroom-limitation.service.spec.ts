import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IClassroomLimitation } from '../classroom-limitation.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../classroom-limitation.test-samples';

import { ClassroomLimitationService } from './classroom-limitation.service';

const requireRestSample: IClassroomLimitation = {
  ...sampleWithRequiredData,
};

describe('ClassroomLimitation Service', () => {
  let service: ClassroomLimitationService;
  let httpMock: HttpTestingController;
  let expectedResult: IClassroomLimitation | IClassroomLimitation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ClassroomLimitationService);
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

    it('should create a ClassroomLimitation', () => {
      const classroomLimitation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(classroomLimitation).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ClassroomLimitation', () => {
      const classroomLimitation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(classroomLimitation).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ClassroomLimitation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ClassroomLimitation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ClassroomLimitation', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addClassroomLimitationToCollectionIfMissing', () => {
      it('should add a ClassroomLimitation to an empty array', () => {
        const classroomLimitation: IClassroomLimitation = sampleWithRequiredData;
        expectedResult = service.addClassroomLimitationToCollectionIfMissing([], classroomLimitation);
        expect(expectedResult).toEqual([classroomLimitation]);
      });

      it('should not add a ClassroomLimitation to an array that contains it', () => {
        const classroomLimitation: IClassroomLimitation = sampleWithRequiredData;
        const classroomLimitationCollection: IClassroomLimitation[] = [
          {
            ...classroomLimitation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addClassroomLimitationToCollectionIfMissing(classroomLimitationCollection, classroomLimitation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ClassroomLimitation to an array that doesn't contain it", () => {
        const classroomLimitation: IClassroomLimitation = sampleWithRequiredData;
        const classroomLimitationCollection: IClassroomLimitation[] = [sampleWithPartialData];
        expectedResult = service.addClassroomLimitationToCollectionIfMissing(classroomLimitationCollection, classroomLimitation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(classroomLimitation);
      });

      it('should add only unique ClassroomLimitation to an array', () => {
        const classroomLimitationArray: IClassroomLimitation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const classroomLimitationCollection: IClassroomLimitation[] = [sampleWithRequiredData];
        expectedResult = service.addClassroomLimitationToCollectionIfMissing(classroomLimitationCollection, ...classroomLimitationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const classroomLimitation: IClassroomLimitation = sampleWithRequiredData;
        const classroomLimitation2: IClassroomLimitation = sampleWithPartialData;
        expectedResult = service.addClassroomLimitationToCollectionIfMissing([], classroomLimitation, classroomLimitation2);
        expect(expectedResult).toEqual([classroomLimitation, classroomLimitation2]);
      });

      it('should accept null and undefined values', () => {
        const classroomLimitation: IClassroomLimitation = sampleWithRequiredData;
        expectedResult = service.addClassroomLimitationToCollectionIfMissing([], null, classroomLimitation, undefined);
        expect(expectedResult).toEqual([classroomLimitation]);
      });

      it('should return initial array if no ClassroomLimitation is added', () => {
        const classroomLimitationCollection: IClassroomLimitation[] = [sampleWithRequiredData];
        expectedResult = service.addClassroomLimitationToCollectionIfMissing(classroomLimitationCollection, undefined, null);
        expect(expectedResult).toEqual(classroomLimitationCollection);
      });
    });

    describe('compareClassroomLimitation', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareClassroomLimitation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'ba08a49b-1200-43e0-801b-3547f699926b' };
        const entity2 = null;

        const compareResult1 = service.compareClassroomLimitation(entity1, entity2);
        const compareResult2 = service.compareClassroomLimitation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'ba08a49b-1200-43e0-801b-3547f699926b' };
        const entity2 = { id: 'abd0e7a4-53e9-4b22-8fb3-9883ceed36ea' };

        const compareResult1 = service.compareClassroomLimitation(entity1, entity2);
        const compareResult2 = service.compareClassroomLimitation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'ba08a49b-1200-43e0-801b-3547f699926b' };
        const entity2 = { id: 'ba08a49b-1200-43e0-801b-3547f699926b' };

        const compareResult1 = service.compareClassroomLimitation(entity1, entity2);
        const compareResult2 = service.compareClassroomLimitation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
