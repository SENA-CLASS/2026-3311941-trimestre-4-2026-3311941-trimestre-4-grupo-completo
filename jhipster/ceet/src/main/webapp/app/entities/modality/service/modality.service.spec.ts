import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IModality } from '../modality.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../modality.test-samples';

import { ModalityService } from './modality.service';

const requireRestSample: IModality = {
  ...sampleWithRequiredData,
};

describe('Modality Service', () => {
  let service: ModalityService;
  let httpMock: HttpTestingController;
  let expectedResult: IModality | IModality[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ModalityService);
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

    it('should create a Modality', () => {
      const modality = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(modality).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Modality', () => {
      const modality = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(modality).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Modality', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Modality', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Modality', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addModalityToCollectionIfMissing', () => {
      it('should add a Modality to an empty array', () => {
        const modality: IModality = sampleWithRequiredData;
        expectedResult = service.addModalityToCollectionIfMissing([], modality);
        expect(expectedResult).toEqual([modality]);
      });

      it('should not add a Modality to an array that contains it', () => {
        const modality: IModality = sampleWithRequiredData;
        const modalityCollection: IModality[] = [
          {
            ...modality,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addModalityToCollectionIfMissing(modalityCollection, modality);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Modality to an array that doesn't contain it", () => {
        const modality: IModality = sampleWithRequiredData;
        const modalityCollection: IModality[] = [sampleWithPartialData];
        expectedResult = service.addModalityToCollectionIfMissing(modalityCollection, modality);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(modality);
      });

      it('should add only unique Modality to an array', () => {
        const modalityArray: IModality[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const modalityCollection: IModality[] = [sampleWithRequiredData];
        expectedResult = service.addModalityToCollectionIfMissing(modalityCollection, ...modalityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const modality: IModality = sampleWithRequiredData;
        const modality2: IModality = sampleWithPartialData;
        expectedResult = service.addModalityToCollectionIfMissing([], modality, modality2);
        expect(expectedResult).toEqual([modality, modality2]);
      });

      it('should accept null and undefined values', () => {
        const modality: IModality = sampleWithRequiredData;
        expectedResult = service.addModalityToCollectionIfMissing([], null, modality, undefined);
        expect(expectedResult).toEqual([modality]);
      });

      it('should return initial array if no Modality is added', () => {
        const modalityCollection: IModality[] = [sampleWithRequiredData];
        expectedResult = service.addModalityToCollectionIfMissing(modalityCollection, undefined, null);
        expect(expectedResult).toEqual(modalityCollection);
      });
    });

    describe('compareModality', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareModality(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'd35eac1f-455b-4c70-9249-9dc25997a012' };
        const entity2 = null;

        const compareResult1 = service.compareModality(entity1, entity2);
        const compareResult2 = service.compareModality(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'd35eac1f-455b-4c70-9249-9dc25997a012' };
        const entity2 = { id: '9fbb3b28-8dca-4aca-839a-b7d13b7197dc' };

        const compareResult1 = service.compareModality(entity1, entity2);
        const compareResult2 = service.compareModality(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'd35eac1f-455b-4c70-9249-9dc25997a012' };
        const entity2 = { id: 'd35eac1f-455b-4c70-9249-9dc25997a012' };

        const compareResult1 = service.compareModality(entity1, entity2);
        const compareResult2 = service.compareModality(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
