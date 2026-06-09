import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICurrentQuarter } from '../current-quarter.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../current-quarter.test-samples';

import { CurrentQuarterService, RestCurrentQuarter } from './current-quarter.service';

const requireRestSample: RestCurrentQuarter = {
  ...sampleWithRequiredData,
  startQuarter: sampleWithRequiredData.startQuarter?.format(DATE_FORMAT),
  endQuarter: sampleWithRequiredData.endQuarter?.format(DATE_FORMAT),
};

describe('CurrentQuarter Service', () => {
  let service: CurrentQuarterService;
  let httpMock: HttpTestingController;
  let expectedResult: ICurrentQuarter | ICurrentQuarter[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CurrentQuarterService);
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

    it('should create a CurrentQuarter', () => {
      const currentQuarter = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(currentQuarter).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CurrentQuarter', () => {
      const currentQuarter = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(currentQuarter).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CurrentQuarter', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CurrentQuarter', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CurrentQuarter', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addCurrentQuarterToCollectionIfMissing', () => {
      it('should add a CurrentQuarter to an empty array', () => {
        const currentQuarter: ICurrentQuarter = sampleWithRequiredData;
        expectedResult = service.addCurrentQuarterToCollectionIfMissing([], currentQuarter);
        expect(expectedResult).toEqual([currentQuarter]);
      });

      it('should not add a CurrentQuarter to an array that contains it', () => {
        const currentQuarter: ICurrentQuarter = sampleWithRequiredData;
        const currentQuarterCollection: ICurrentQuarter[] = [
          {
            ...currentQuarter,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCurrentQuarterToCollectionIfMissing(currentQuarterCollection, currentQuarter);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CurrentQuarter to an array that doesn't contain it", () => {
        const currentQuarter: ICurrentQuarter = sampleWithRequiredData;
        const currentQuarterCollection: ICurrentQuarter[] = [sampleWithPartialData];
        expectedResult = service.addCurrentQuarterToCollectionIfMissing(currentQuarterCollection, currentQuarter);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(currentQuarter);
      });

      it('should add only unique CurrentQuarter to an array', () => {
        const currentQuarterArray: ICurrentQuarter[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const currentQuarterCollection: ICurrentQuarter[] = [sampleWithRequiredData];
        expectedResult = service.addCurrentQuarterToCollectionIfMissing(currentQuarterCollection, ...currentQuarterArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const currentQuarter: ICurrentQuarter = sampleWithRequiredData;
        const currentQuarter2: ICurrentQuarter = sampleWithPartialData;
        expectedResult = service.addCurrentQuarterToCollectionIfMissing([], currentQuarter, currentQuarter2);
        expect(expectedResult).toEqual([currentQuarter, currentQuarter2]);
      });

      it('should accept null and undefined values', () => {
        const currentQuarter: ICurrentQuarter = sampleWithRequiredData;
        expectedResult = service.addCurrentQuarterToCollectionIfMissing([], null, currentQuarter, undefined);
        expect(expectedResult).toEqual([currentQuarter]);
      });

      it('should return initial array if no CurrentQuarter is added', () => {
        const currentQuarterCollection: ICurrentQuarter[] = [sampleWithRequiredData];
        expectedResult = service.addCurrentQuarterToCollectionIfMissing(currentQuarterCollection, undefined, null);
        expect(expectedResult).toEqual(currentQuarterCollection);
      });
    });

    describe('compareCurrentQuarter', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCurrentQuarter(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '0ed02114-2749-41f7-9a38-0f3348269a95' };
        const entity2 = null;

        const compareResult1 = service.compareCurrentQuarter(entity1, entity2);
        const compareResult2 = service.compareCurrentQuarter(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '0ed02114-2749-41f7-9a38-0f3348269a95' };
        const entity2 = { id: '4af0f48b-9729-4737-a11e-246ced312d2f' };

        const compareResult1 = service.compareCurrentQuarter(entity1, entity2);
        const compareResult2 = service.compareCurrentQuarter(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '0ed02114-2749-41f7-9a38-0f3348269a95' };
        const entity2 = { id: '0ed02114-2749-41f7-9a38-0f3348269a95' };

        const compareResult1 = service.compareCurrentQuarter(entity1, entity2);
        const compareResult2 = service.compareCurrentQuarter(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
