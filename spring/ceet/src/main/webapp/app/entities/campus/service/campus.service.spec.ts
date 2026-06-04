import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ICampus } from '../campus.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../campus.test-samples';

import { CampusService } from './campus.service';

const requireRestSample: ICampus = {
  ...sampleWithRequiredData,
};

describe('Campus Service', () => {
  let service: CampusService;
  let httpMock: HttpTestingController;
  let expectedResult: ICampus | ICampus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CampusService);
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

    it('should create a Campus', () => {
      const campus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(campus).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Campus', () => {
      const campus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(campus).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Campus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Campus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Campus', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addCampusToCollectionIfMissing', () => {
      it('should add a Campus to an empty array', () => {
        const campus: ICampus = sampleWithRequiredData;
        expectedResult = service.addCampusToCollectionIfMissing([], campus);
        expect(expectedResult).toEqual([campus]);
      });

      it('should not add a Campus to an array that contains it', () => {
        const campus: ICampus = sampleWithRequiredData;
        const campusCollection: ICampus[] = [
          {
            ...campus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCampusToCollectionIfMissing(campusCollection, campus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Campus to an array that doesn't contain it", () => {
        const campus: ICampus = sampleWithRequiredData;
        const campusCollection: ICampus[] = [sampleWithPartialData];
        expectedResult = service.addCampusToCollectionIfMissing(campusCollection, campus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(campus);
      });

      it('should add only unique Campus to an array', () => {
        const campusArray: ICampus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const campusCollection: ICampus[] = [sampleWithRequiredData];
        expectedResult = service.addCampusToCollectionIfMissing(campusCollection, ...campusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const campus: ICampus = sampleWithRequiredData;
        const campus2: ICampus = sampleWithPartialData;
        expectedResult = service.addCampusToCollectionIfMissing([], campus, campus2);
        expect(expectedResult).toEqual([campus, campus2]);
      });

      it('should accept null and undefined values', () => {
        const campus: ICampus = sampleWithRequiredData;
        expectedResult = service.addCampusToCollectionIfMissing([], null, campus, undefined);
        expect(expectedResult).toEqual([campus]);
      });

      it('should return initial array if no Campus is added', () => {
        const campusCollection: ICampus[] = [sampleWithRequiredData];
        expectedResult = service.addCampusToCollectionIfMissing(campusCollection, undefined, null);
        expect(expectedResult).toEqual(campusCollection);
      });
    });

    describe('compareCampus', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCampus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' };
        const entity2 = null;

        const compareResult1 = service.compareCampus(entity1, entity2);
        const compareResult2 = service.compareCampus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' };
        const entity2 = { id: 'cb5eec4e-899a-4c15-b434-f00e711b5f5c' };

        const compareResult1 = service.compareCampus(entity1, entity2);
        const compareResult2 = service.compareCampus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' };
        const entity2 = { id: 'ef9c809c-3ee1-443a-82b3-b6747c4e5680' };

        const compareResult1 = service.compareCampus(entity1, entity2);
        const compareResult2 = service.compareCampus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
