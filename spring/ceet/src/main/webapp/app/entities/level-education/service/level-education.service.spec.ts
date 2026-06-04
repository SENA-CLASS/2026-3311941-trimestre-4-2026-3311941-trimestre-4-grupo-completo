import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ILevelEducation } from '../level-education.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../level-education.test-samples';

import { LevelEducationService } from './level-education.service';

const requireRestSample: ILevelEducation = {
  ...sampleWithRequiredData,
};

describe('LevelEducation Service', () => {
  let service: LevelEducationService;
  let httpMock: HttpTestingController;
  let expectedResult: ILevelEducation | ILevelEducation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LevelEducationService);
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

    it('should create a LevelEducation', () => {
      const levelEducation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(levelEducation).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LevelEducation', () => {
      const levelEducation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(levelEducation).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LevelEducation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LevelEducation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LevelEducation', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addLevelEducationToCollectionIfMissing', () => {
      it('should add a LevelEducation to an empty array', () => {
        const levelEducation: ILevelEducation = sampleWithRequiredData;
        expectedResult = service.addLevelEducationToCollectionIfMissing([], levelEducation);
        expect(expectedResult).toEqual([levelEducation]);
      });

      it('should not add a LevelEducation to an array that contains it', () => {
        const levelEducation: ILevelEducation = sampleWithRequiredData;
        const levelEducationCollection: ILevelEducation[] = [
          {
            ...levelEducation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLevelEducationToCollectionIfMissing(levelEducationCollection, levelEducation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LevelEducation to an array that doesn't contain it", () => {
        const levelEducation: ILevelEducation = sampleWithRequiredData;
        const levelEducationCollection: ILevelEducation[] = [sampleWithPartialData];
        expectedResult = service.addLevelEducationToCollectionIfMissing(levelEducationCollection, levelEducation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(levelEducation);
      });

      it('should add only unique LevelEducation to an array', () => {
        const levelEducationArray: ILevelEducation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const levelEducationCollection: ILevelEducation[] = [sampleWithRequiredData];
        expectedResult = service.addLevelEducationToCollectionIfMissing(levelEducationCollection, ...levelEducationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const levelEducation: ILevelEducation = sampleWithRequiredData;
        const levelEducation2: ILevelEducation = sampleWithPartialData;
        expectedResult = service.addLevelEducationToCollectionIfMissing([], levelEducation, levelEducation2);
        expect(expectedResult).toEqual([levelEducation, levelEducation2]);
      });

      it('should accept null and undefined values', () => {
        const levelEducation: ILevelEducation = sampleWithRequiredData;
        expectedResult = service.addLevelEducationToCollectionIfMissing([], null, levelEducation, undefined);
        expect(expectedResult).toEqual([levelEducation]);
      });

      it('should return initial array if no LevelEducation is added', () => {
        const levelEducationCollection: ILevelEducation[] = [sampleWithRequiredData];
        expectedResult = service.addLevelEducationToCollectionIfMissing(levelEducationCollection, undefined, null);
        expect(expectedResult).toEqual(levelEducationCollection);
      });
    });

    describe('compareLevelEducation', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLevelEducation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
        const entity2 = null;

        const compareResult1 = service.compareLevelEducation(entity1, entity2);
        const compareResult2 = service.compareLevelEducation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
        const entity2 = { id: 'da387bdf-5e02-4940-8409-2be6a4f3a50c' };

        const compareResult1 = service.compareLevelEducation(entity1, entity2);
        const compareResult2 = service.compareLevelEducation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };
        const entity2 = { id: '815b1471-c41c-4cfe-a7d8-56ff13b64510' };

        const compareResult1 = service.compareLevelEducation(entity1, entity2);
        const compareResult2 = service.compareLevelEducation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
