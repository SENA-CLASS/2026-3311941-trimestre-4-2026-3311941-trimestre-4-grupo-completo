import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IObservationResponse } from '../observation-response.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../observation-response.test-samples';

import { ObservationResponseService, RestObservationResponse } from './observation-response.service';

const requireRestSample: RestObservationResponse = {
  ...sampleWithRequiredData,
  dateObservation: sampleWithRequiredData.dateObservation?.toJSON(),
};

describe('ObservationResponse Service', () => {
  let service: ObservationResponseService;
  let httpMock: HttpTestingController;
  let expectedResult: IObservationResponse | IObservationResponse[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ObservationResponseService);
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

    it('should create a ObservationResponse', () => {
      const observationResponse = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(observationResponse).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ObservationResponse', () => {
      const observationResponse = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(observationResponse).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ObservationResponse', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ObservationResponse', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ObservationResponse', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addObservationResponseToCollectionIfMissing', () => {
      it('should add a ObservationResponse to an empty array', () => {
        const observationResponse: IObservationResponse = sampleWithRequiredData;
        expectedResult = service.addObservationResponseToCollectionIfMissing([], observationResponse);
        expect(expectedResult).toEqual([observationResponse]);
      });

      it('should not add a ObservationResponse to an array that contains it', () => {
        const observationResponse: IObservationResponse = sampleWithRequiredData;
        const observationResponseCollection: IObservationResponse[] = [
          {
            ...observationResponse,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addObservationResponseToCollectionIfMissing(observationResponseCollection, observationResponse);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ObservationResponse to an array that doesn't contain it", () => {
        const observationResponse: IObservationResponse = sampleWithRequiredData;
        const observationResponseCollection: IObservationResponse[] = [sampleWithPartialData];
        expectedResult = service.addObservationResponseToCollectionIfMissing(observationResponseCollection, observationResponse);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(observationResponse);
      });

      it('should add only unique ObservationResponse to an array', () => {
        const observationResponseArray: IObservationResponse[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const observationResponseCollection: IObservationResponse[] = [sampleWithRequiredData];
        expectedResult = service.addObservationResponseToCollectionIfMissing(observationResponseCollection, ...observationResponseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const observationResponse: IObservationResponse = sampleWithRequiredData;
        const observationResponse2: IObservationResponse = sampleWithPartialData;
        expectedResult = service.addObservationResponseToCollectionIfMissing([], observationResponse, observationResponse2);
        expect(expectedResult).toEqual([observationResponse, observationResponse2]);
      });

      it('should accept null and undefined values', () => {
        const observationResponse: IObservationResponse = sampleWithRequiredData;
        expectedResult = service.addObservationResponseToCollectionIfMissing([], null, observationResponse, undefined);
        expect(expectedResult).toEqual([observationResponse]);
      });

      it('should return initial array if no ObservationResponse is added', () => {
        const observationResponseCollection: IObservationResponse[] = [sampleWithRequiredData];
        expectedResult = service.addObservationResponseToCollectionIfMissing(observationResponseCollection, undefined, null);
        expect(expectedResult).toEqual(observationResponseCollection);
      });
    });

    describe('compareObservationResponse', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareObservationResponse(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '4d4f5219-1b15-4afc-b043-9d7c859160bc' };
        const entity2 = null;

        const compareResult1 = service.compareObservationResponse(entity1, entity2);
        const compareResult2 = service.compareObservationResponse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '4d4f5219-1b15-4afc-b043-9d7c859160bc' };
        const entity2 = { id: 'dd4dbde6-a955-4c60-99f4-6e3b8c107465' };

        const compareResult1 = service.compareObservationResponse(entity1, entity2);
        const compareResult2 = service.compareObservationResponse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '4d4f5219-1b15-4afc-b043-9d7c859160bc' };
        const entity2 = { id: '4d4f5219-1b15-4afc-b043-9d7c859160bc' };

        const compareResult1 = service.compareObservationResponse(entity1, entity2);
        const compareResult2 = service.compareObservationResponse(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
