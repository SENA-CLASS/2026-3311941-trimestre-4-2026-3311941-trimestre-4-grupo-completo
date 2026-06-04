import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IBonding } from '../bonding.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../bonding.test-samples';

import { BondingService } from './bonding.service';

const requireRestSample: IBonding = {
  ...sampleWithRequiredData,
};

describe('Bonding Service', () => {
  let service: BondingService;
  let httpMock: HttpTestingController;
  let expectedResult: IBonding | IBonding[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(BondingService);
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

    it('should create a Bonding', () => {
      const bonding = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bonding).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Bonding', () => {
      const bonding = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(bonding).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Bonding', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Bonding', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Bonding', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addBondingToCollectionIfMissing', () => {
      it('should add a Bonding to an empty array', () => {
        const bonding: IBonding = sampleWithRequiredData;
        expectedResult = service.addBondingToCollectionIfMissing([], bonding);
        expect(expectedResult).toEqual([bonding]);
      });

      it('should not add a Bonding to an array that contains it', () => {
        const bonding: IBonding = sampleWithRequiredData;
        const bondingCollection: IBonding[] = [
          {
            ...bonding,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBondingToCollectionIfMissing(bondingCollection, bonding);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Bonding to an array that doesn't contain it", () => {
        const bonding: IBonding = sampleWithRequiredData;
        const bondingCollection: IBonding[] = [sampleWithPartialData];
        expectedResult = service.addBondingToCollectionIfMissing(bondingCollection, bonding);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bonding);
      });

      it('should add only unique Bonding to an array', () => {
        const bondingArray: IBonding[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bondingCollection: IBonding[] = [sampleWithRequiredData];
        expectedResult = service.addBondingToCollectionIfMissing(bondingCollection, ...bondingArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bonding: IBonding = sampleWithRequiredData;
        const bonding2: IBonding = sampleWithPartialData;
        expectedResult = service.addBondingToCollectionIfMissing([], bonding, bonding2);
        expect(expectedResult).toEqual([bonding, bonding2]);
      });

      it('should accept null and undefined values', () => {
        const bonding: IBonding = sampleWithRequiredData;
        expectedResult = service.addBondingToCollectionIfMissing([], null, bonding, undefined);
        expect(expectedResult).toEqual([bonding]);
      });

      it('should return initial array if no Bonding is added', () => {
        const bondingCollection: IBonding[] = [sampleWithRequiredData];
        expectedResult = service.addBondingToCollectionIfMissing(bondingCollection, undefined, null);
        expect(expectedResult).toEqual(bondingCollection);
      });
    });

    describe('compareBonding', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBonding(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' };
        const entity2 = null;

        const compareResult1 = service.compareBonding(entity1, entity2);
        const compareResult2 = service.compareBonding(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' };
        const entity2 = { id: 'c7a8c508-c7aa-40be-9cbe-abb77ff018ba' };

        const compareResult1 = service.compareBonding(entity1, entity2);
        const compareResult2 = service.compareBonding(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' };
        const entity2 = { id: '57960bcc-d6df-4acc-bce6-afeba60dd2e4' };

        const compareResult1 = service.compareBonding(entity1, entity2);
        const compareResult2 = service.compareBonding(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
