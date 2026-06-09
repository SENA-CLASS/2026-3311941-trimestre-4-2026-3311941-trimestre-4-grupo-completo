import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IGeneralObservation } from '../general-observation.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../general-observation.test-samples';

import { GeneralObservationService, RestGeneralObservation } from './general-observation.service';

const requireRestSample: RestGeneralObservation = {
  ...sampleWithRequiredData,
  dateAudit: sampleWithRequiredData.dateAudit?.toJSON(),
};

describe('GeneralObservation Service', () => {
  let service: GeneralObservationService;
  let httpMock: HttpTestingController;
  let expectedResult: IGeneralObservation | IGeneralObservation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(GeneralObservationService);
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

    it('should create a GeneralObservation', () => {
      const generalObservation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(generalObservation).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GeneralObservation', () => {
      const generalObservation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(generalObservation).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GeneralObservation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GeneralObservation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GeneralObservation', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addGeneralObservationToCollectionIfMissing', () => {
      it('should add a GeneralObservation to an empty array', () => {
        const generalObservation: IGeneralObservation = sampleWithRequiredData;
        expectedResult = service.addGeneralObservationToCollectionIfMissing([], generalObservation);
        expect(expectedResult).toEqual([generalObservation]);
      });

      it('should not add a GeneralObservation to an array that contains it', () => {
        const generalObservation: IGeneralObservation = sampleWithRequiredData;
        const generalObservationCollection: IGeneralObservation[] = [
          {
            ...generalObservation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGeneralObservationToCollectionIfMissing(generalObservationCollection, generalObservation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GeneralObservation to an array that doesn't contain it", () => {
        const generalObservation: IGeneralObservation = sampleWithRequiredData;
        const generalObservationCollection: IGeneralObservation[] = [sampleWithPartialData];
        expectedResult = service.addGeneralObservationToCollectionIfMissing(generalObservationCollection, generalObservation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(generalObservation);
      });

      it('should add only unique GeneralObservation to an array', () => {
        const generalObservationArray: IGeneralObservation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const generalObservationCollection: IGeneralObservation[] = [sampleWithRequiredData];
        expectedResult = service.addGeneralObservationToCollectionIfMissing(generalObservationCollection, ...generalObservationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const generalObservation: IGeneralObservation = sampleWithRequiredData;
        const generalObservation2: IGeneralObservation = sampleWithPartialData;
        expectedResult = service.addGeneralObservationToCollectionIfMissing([], generalObservation, generalObservation2);
        expect(expectedResult).toEqual([generalObservation, generalObservation2]);
      });

      it('should accept null and undefined values', () => {
        const generalObservation: IGeneralObservation = sampleWithRequiredData;
        expectedResult = service.addGeneralObservationToCollectionIfMissing([], null, generalObservation, undefined);
        expect(expectedResult).toEqual([generalObservation]);
      });

      it('should return initial array if no GeneralObservation is added', () => {
        const generalObservationCollection: IGeneralObservation[] = [sampleWithRequiredData];
        expectedResult = service.addGeneralObservationToCollectionIfMissing(generalObservationCollection, undefined, null);
        expect(expectedResult).toEqual(generalObservationCollection);
      });
    });

    describe('compareGeneralObservation', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGeneralObservation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '43fc97fc-e912-46cc-a597-4921483b760d' };
        const entity2 = null;

        const compareResult1 = service.compareGeneralObservation(entity1, entity2);
        const compareResult2 = service.compareGeneralObservation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '43fc97fc-e912-46cc-a597-4921483b760d' };
        const entity2 = { id: '19f579cb-3eb3-4f57-b243-9eea32539920' };

        const compareResult1 = service.compareGeneralObservation(entity1, entity2);
        const compareResult2 = service.compareGeneralObservation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '43fc97fc-e912-46cc-a597-4921483b760d' };
        const entity2 = { id: '43fc97fc-e912-46cc-a597-4921483b760d' };

        const compareResult1 = service.compareGeneralObservation(entity1, entity2);
        const compareResult2 = service.compareGeneralObservation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
