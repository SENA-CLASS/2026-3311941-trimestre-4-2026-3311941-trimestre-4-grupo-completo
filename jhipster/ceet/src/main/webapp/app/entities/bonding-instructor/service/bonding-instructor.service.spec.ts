import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IBondingInstructor } from '../bonding-instructor.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../bonding-instructor.test-samples';

import { BondingInstructorService, RestBondingInstructor } from './bonding-instructor.service';

const requireRestSample: RestBondingInstructor = {
  ...sampleWithRequiredData,
  startTime: sampleWithRequiredData.startTime?.format(DATE_FORMAT),
  endTime: sampleWithRequiredData.endTime?.format(DATE_FORMAT),
};

describe('BondingInstructor Service', () => {
  let service: BondingInstructorService;
  let httpMock: HttpTestingController;
  let expectedResult: IBondingInstructor | IBondingInstructor[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(BondingInstructorService);
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

    it('should create a BondingInstructor', () => {
      const bondingInstructor = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bondingInstructor).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BondingInstructor', () => {
      const bondingInstructor = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(bondingInstructor).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BondingInstructor', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BondingInstructor', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BondingInstructor', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addBondingInstructorToCollectionIfMissing', () => {
      it('should add a BondingInstructor to an empty array', () => {
        const bondingInstructor: IBondingInstructor = sampleWithRequiredData;
        expectedResult = service.addBondingInstructorToCollectionIfMissing([], bondingInstructor);
        expect(expectedResult).toEqual([bondingInstructor]);
      });

      it('should not add a BondingInstructor to an array that contains it', () => {
        const bondingInstructor: IBondingInstructor = sampleWithRequiredData;
        const bondingInstructorCollection: IBondingInstructor[] = [
          {
            ...bondingInstructor,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBondingInstructorToCollectionIfMissing(bondingInstructorCollection, bondingInstructor);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BondingInstructor to an array that doesn't contain it", () => {
        const bondingInstructor: IBondingInstructor = sampleWithRequiredData;
        const bondingInstructorCollection: IBondingInstructor[] = [sampleWithPartialData];
        expectedResult = service.addBondingInstructorToCollectionIfMissing(bondingInstructorCollection, bondingInstructor);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bondingInstructor);
      });

      it('should add only unique BondingInstructor to an array', () => {
        const bondingInstructorArray: IBondingInstructor[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bondingInstructorCollection: IBondingInstructor[] = [sampleWithRequiredData];
        expectedResult = service.addBondingInstructorToCollectionIfMissing(bondingInstructorCollection, ...bondingInstructorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bondingInstructor: IBondingInstructor = sampleWithRequiredData;
        const bondingInstructor2: IBondingInstructor = sampleWithPartialData;
        expectedResult = service.addBondingInstructorToCollectionIfMissing([], bondingInstructor, bondingInstructor2);
        expect(expectedResult).toEqual([bondingInstructor, bondingInstructor2]);
      });

      it('should accept null and undefined values', () => {
        const bondingInstructor: IBondingInstructor = sampleWithRequiredData;
        expectedResult = service.addBondingInstructorToCollectionIfMissing([], null, bondingInstructor, undefined);
        expect(expectedResult).toEqual([bondingInstructor]);
      });

      it('should return initial array if no BondingInstructor is added', () => {
        const bondingInstructorCollection: IBondingInstructor[] = [sampleWithRequiredData];
        expectedResult = service.addBondingInstructorToCollectionIfMissing(bondingInstructorCollection, undefined, null);
        expect(expectedResult).toEqual(bondingInstructorCollection);
      });
    });

    describe('compareBondingInstructor', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBondingInstructor(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
        const entity2 = null;

        const compareResult1 = service.compareBondingInstructor(entity1, entity2);
        const compareResult2 = service.compareBondingInstructor(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
        const entity2 = { id: 'b53dd849-590c-4532-8f92-15e5623948e6' };

        const compareResult1 = service.compareBondingInstructor(entity1, entity2);
        const compareResult2 = service.compareBondingInstructor(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };
        const entity2 = { id: 'ab7b6017-edd4-4b72-a00c-30124d1b29e7' };

        const compareResult1 = service.compareBondingInstructor(entity1, entity2);
        const compareResult2 = service.compareBondingInstructor(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
