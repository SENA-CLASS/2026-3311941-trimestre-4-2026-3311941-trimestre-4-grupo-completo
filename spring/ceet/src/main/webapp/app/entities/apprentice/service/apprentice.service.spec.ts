import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IApprentice } from '../apprentice.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../apprentice.test-samples';

import { ApprenticeService } from './apprentice.service';

const requireRestSample: IApprentice = {
  ...sampleWithRequiredData,
};

describe('Apprentice Service', () => {
  let service: ApprenticeService;
  let httpMock: HttpTestingController;
  let expectedResult: IApprentice | IApprentice[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ApprenticeService);
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

    it('should create a Apprentice', () => {
      const apprentice = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(apprentice).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Apprentice', () => {
      const apprentice = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(apprentice).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Apprentice', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Apprentice', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Apprentice', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addApprenticeToCollectionIfMissing', () => {
      it('should add a Apprentice to an empty array', () => {
        const apprentice: IApprentice = sampleWithRequiredData;
        expectedResult = service.addApprenticeToCollectionIfMissing([], apprentice);
        expect(expectedResult).toEqual([apprentice]);
      });

      it('should not add a Apprentice to an array that contains it', () => {
        const apprentice: IApprentice = sampleWithRequiredData;
        const apprenticeCollection: IApprentice[] = [
          {
            ...apprentice,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addApprenticeToCollectionIfMissing(apprenticeCollection, apprentice);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Apprentice to an array that doesn't contain it", () => {
        const apprentice: IApprentice = sampleWithRequiredData;
        const apprenticeCollection: IApprentice[] = [sampleWithPartialData];
        expectedResult = service.addApprenticeToCollectionIfMissing(apprenticeCollection, apprentice);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(apprentice);
      });

      it('should add only unique Apprentice to an array', () => {
        const apprenticeArray: IApprentice[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const apprenticeCollection: IApprentice[] = [sampleWithRequiredData];
        expectedResult = service.addApprenticeToCollectionIfMissing(apprenticeCollection, ...apprenticeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const apprentice: IApprentice = sampleWithRequiredData;
        const apprentice2: IApprentice = sampleWithPartialData;
        expectedResult = service.addApprenticeToCollectionIfMissing([], apprentice, apprentice2);
        expect(expectedResult).toEqual([apprentice, apprentice2]);
      });

      it('should accept null and undefined values', () => {
        const apprentice: IApprentice = sampleWithRequiredData;
        expectedResult = service.addApprenticeToCollectionIfMissing([], null, apprentice, undefined);
        expect(expectedResult).toEqual([apprentice]);
      });

      it('should return initial array if no Apprentice is added', () => {
        const apprenticeCollection: IApprentice[] = [sampleWithRequiredData];
        expectedResult = service.addApprenticeToCollectionIfMissing(apprenticeCollection, undefined, null);
        expect(expectedResult).toEqual(apprenticeCollection);
      });
    });

    describe('compareApprentice', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareApprentice(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' };
        const entity2 = null;

        const compareResult1 = service.compareApprentice(entity1, entity2);
        const compareResult2 = service.compareApprentice(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' };
        const entity2 = { id: 'f1537a32-8765-4478-a7fa-674e3f6ae8c1' };

        const compareResult1 = service.compareApprentice(entity1, entity2);
        const compareResult2 = service.compareApprentice(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' };
        const entity2 = { id: '8681ca6b-c1b7-4e43-96b8-c3fc96b48213' };

        const compareResult1 = service.compareApprentice(entity1, entity2);
        const compareResult2 = service.compareApprentice(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
