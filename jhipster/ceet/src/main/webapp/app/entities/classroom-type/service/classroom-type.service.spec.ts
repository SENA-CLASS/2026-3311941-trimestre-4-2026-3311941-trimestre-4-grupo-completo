import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IClassroomType } from '../classroom-type.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../classroom-type.test-samples';

import { ClassroomTypeService } from './classroom-type.service';

const requireRestSample: IClassroomType = {
  ...sampleWithRequiredData,
};

describe('ClassroomType Service', () => {
  let service: ClassroomTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IClassroomType | IClassroomType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ClassroomTypeService);
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

    it('should create a ClassroomType', () => {
      const classroomType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(classroomType).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ClassroomType', () => {
      const classroomType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(classroomType).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ClassroomType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ClassroomType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ClassroomType', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addClassroomTypeToCollectionIfMissing', () => {
      it('should add a ClassroomType to an empty array', () => {
        const classroomType: IClassroomType = sampleWithRequiredData;
        expectedResult = service.addClassroomTypeToCollectionIfMissing([], classroomType);
        expect(expectedResult).toEqual([classroomType]);
      });

      it('should not add a ClassroomType to an array that contains it', () => {
        const classroomType: IClassroomType = sampleWithRequiredData;
        const classroomTypeCollection: IClassroomType[] = [
          {
            ...classroomType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addClassroomTypeToCollectionIfMissing(classroomTypeCollection, classroomType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ClassroomType to an array that doesn't contain it", () => {
        const classroomType: IClassroomType = sampleWithRequiredData;
        const classroomTypeCollection: IClassroomType[] = [sampleWithPartialData];
        expectedResult = service.addClassroomTypeToCollectionIfMissing(classroomTypeCollection, classroomType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(classroomType);
      });

      it('should add only unique ClassroomType to an array', () => {
        const classroomTypeArray: IClassroomType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const classroomTypeCollection: IClassroomType[] = [sampleWithRequiredData];
        expectedResult = service.addClassroomTypeToCollectionIfMissing(classroomTypeCollection, ...classroomTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const classroomType: IClassroomType = sampleWithRequiredData;
        const classroomType2: IClassroomType = sampleWithPartialData;
        expectedResult = service.addClassroomTypeToCollectionIfMissing([], classroomType, classroomType2);
        expect(expectedResult).toEqual([classroomType, classroomType2]);
      });

      it('should accept null and undefined values', () => {
        const classroomType: IClassroomType = sampleWithRequiredData;
        expectedResult = service.addClassroomTypeToCollectionIfMissing([], null, classroomType, undefined);
        expect(expectedResult).toEqual([classroomType]);
      });

      it('should return initial array if no ClassroomType is added', () => {
        const classroomTypeCollection: IClassroomType[] = [sampleWithRequiredData];
        expectedResult = service.addClassroomTypeToCollectionIfMissing(classroomTypeCollection, undefined, null);
        expect(expectedResult).toEqual(classroomTypeCollection);
      });
    });

    describe('compareClassroomType', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareClassroomType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' };
        const entity2 = null;

        const compareResult1 = service.compareClassroomType(entity1, entity2);
        const compareResult2 = service.compareClassroomType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' };
        const entity2 = { id: '8c6dd7a6-f30f-4c8b-a878-a36dc5aee7ae' };

        const compareResult1 = service.compareClassroomType(entity1, entity2);
        const compareResult2 = service.compareClassroomType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' };
        const entity2 = { id: '78a499bc-a8ee-4f5e-beea-8694e07463a8' };

        const compareResult1 = service.compareClassroomType(entity1, entity2);
        const compareResult2 = service.compareClassroomType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
