import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IBondingCompetence } from '../bonding-competence.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../bonding-competence.test-samples';

import { BondingCompetenceService } from './bonding-competence.service';

const requireRestSample: IBondingCompetence = {
  ...sampleWithRequiredData,
};

describe('BondingCompetence Service', () => {
  let service: BondingCompetenceService;
  let httpMock: HttpTestingController;
  let expectedResult: IBondingCompetence | IBondingCompetence[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(BondingCompetenceService);
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

    it('should create a BondingCompetence', () => {
      const bondingCompetence = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bondingCompetence).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BondingCompetence', () => {
      const bondingCompetence = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(bondingCompetence).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BondingCompetence', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BondingCompetence', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BondingCompetence', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addBondingCompetenceToCollectionIfMissing', () => {
      it('should add a BondingCompetence to an empty array', () => {
        const bondingCompetence: IBondingCompetence = sampleWithRequiredData;
        expectedResult = service.addBondingCompetenceToCollectionIfMissing([], bondingCompetence);
        expect(expectedResult).toEqual([bondingCompetence]);
      });

      it('should not add a BondingCompetence to an array that contains it', () => {
        const bondingCompetence: IBondingCompetence = sampleWithRequiredData;
        const bondingCompetenceCollection: IBondingCompetence[] = [
          {
            ...bondingCompetence,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBondingCompetenceToCollectionIfMissing(bondingCompetenceCollection, bondingCompetence);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BondingCompetence to an array that doesn't contain it", () => {
        const bondingCompetence: IBondingCompetence = sampleWithRequiredData;
        const bondingCompetenceCollection: IBondingCompetence[] = [sampleWithPartialData];
        expectedResult = service.addBondingCompetenceToCollectionIfMissing(bondingCompetenceCollection, bondingCompetence);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bondingCompetence);
      });

      it('should add only unique BondingCompetence to an array', () => {
        const bondingCompetenceArray: IBondingCompetence[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bondingCompetenceCollection: IBondingCompetence[] = [sampleWithRequiredData];
        expectedResult = service.addBondingCompetenceToCollectionIfMissing(bondingCompetenceCollection, ...bondingCompetenceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bondingCompetence: IBondingCompetence = sampleWithRequiredData;
        const bondingCompetence2: IBondingCompetence = sampleWithPartialData;
        expectedResult = service.addBondingCompetenceToCollectionIfMissing([], bondingCompetence, bondingCompetence2);
        expect(expectedResult).toEqual([bondingCompetence, bondingCompetence2]);
      });

      it('should accept null and undefined values', () => {
        const bondingCompetence: IBondingCompetence = sampleWithRequiredData;
        expectedResult = service.addBondingCompetenceToCollectionIfMissing([], null, bondingCompetence, undefined);
        expect(expectedResult).toEqual([bondingCompetence]);
      });

      it('should return initial array if no BondingCompetence is added', () => {
        const bondingCompetenceCollection: IBondingCompetence[] = [sampleWithRequiredData];
        expectedResult = service.addBondingCompetenceToCollectionIfMissing(bondingCompetenceCollection, undefined, null);
        expect(expectedResult).toEqual(bondingCompetenceCollection);
      });
    });

    describe('compareBondingCompetence', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBondingCompetence(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '5edac464-b367-4167-9068-576bd03056c9' };
        const entity2 = null;

        const compareResult1 = service.compareBondingCompetence(entity1, entity2);
        const compareResult2 = service.compareBondingCompetence(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '5edac464-b367-4167-9068-576bd03056c9' };
        const entity2 = { id: 'cfd7fba8-1477-4385-86e4-1c2abc7aa2a8' };

        const compareResult1 = service.compareBondingCompetence(entity1, entity2);
        const compareResult2 = service.compareBondingCompetence(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '5edac464-b367-4167-9068-576bd03056c9' };
        const entity2 = { id: '5edac464-b367-4167-9068-576bd03056c9' };

        const compareResult1 = service.compareBondingCompetence(entity1, entity2);
        const compareResult2 = service.compareBondingCompetence(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
