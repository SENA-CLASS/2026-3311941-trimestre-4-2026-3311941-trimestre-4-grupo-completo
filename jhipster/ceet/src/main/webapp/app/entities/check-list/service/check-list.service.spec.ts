import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ICheckList } from '../check-list.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../check-list.test-samples';

import { CheckListService } from './check-list.service';

const requireRestSample: ICheckList = {
  ...sampleWithRequiredData,
};

describe('CheckList Service', () => {
  let service: CheckListService;
  let httpMock: HttpTestingController;
  let expectedResult: ICheckList | ICheckList[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CheckListService);
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

    it('should create a CheckList', () => {
      const checkList = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(checkList).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CheckList', () => {
      const checkList = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(checkList).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CheckList', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CheckList', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CheckList', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addCheckListToCollectionIfMissing', () => {
      it('should add a CheckList to an empty array', () => {
        const checkList: ICheckList = sampleWithRequiredData;
        expectedResult = service.addCheckListToCollectionIfMissing([], checkList);
        expect(expectedResult).toEqual([checkList]);
      });

      it('should not add a CheckList to an array that contains it', () => {
        const checkList: ICheckList = sampleWithRequiredData;
        const checkListCollection: ICheckList[] = [
          {
            ...checkList,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCheckListToCollectionIfMissing(checkListCollection, checkList);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CheckList to an array that doesn't contain it", () => {
        const checkList: ICheckList = sampleWithRequiredData;
        const checkListCollection: ICheckList[] = [sampleWithPartialData];
        expectedResult = service.addCheckListToCollectionIfMissing(checkListCollection, checkList);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(checkList);
      });

      it('should add only unique CheckList to an array', () => {
        const checkListArray: ICheckList[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const checkListCollection: ICheckList[] = [sampleWithRequiredData];
        expectedResult = service.addCheckListToCollectionIfMissing(checkListCollection, ...checkListArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const checkList: ICheckList = sampleWithRequiredData;
        const checkList2: ICheckList = sampleWithPartialData;
        expectedResult = service.addCheckListToCollectionIfMissing([], checkList, checkList2);
        expect(expectedResult).toEqual([checkList, checkList2]);
      });

      it('should accept null and undefined values', () => {
        const checkList: ICheckList = sampleWithRequiredData;
        expectedResult = service.addCheckListToCollectionIfMissing([], null, checkList, undefined);
        expect(expectedResult).toEqual([checkList]);
      });

      it('should return initial array if no CheckList is added', () => {
        const checkListCollection: ICheckList[] = [sampleWithRequiredData];
        expectedResult = service.addCheckListToCollectionIfMissing(checkListCollection, undefined, null);
        expect(expectedResult).toEqual(checkListCollection);
      });
    });

    describe('compareCheckList', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCheckList(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
        const entity2 = null;

        const compareResult1 = service.compareCheckList(entity1, entity2);
        const compareResult2 = service.compareCheckList(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
        const entity2 = { id: 'ee29852f-bfd9-4495-b2b5-7c31e2e7b499' };

        const compareResult1 = service.compareCheckList(entity1, entity2);
        const compareResult2 = service.compareCheckList(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };
        const entity2 = { id: '7741670b-56eb-400b-a3ea-2a7b30040404' };

        const compareResult1 = service.compareCheckList(entity1, entity2);
        const compareResult2 = service.compareCheckList(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
