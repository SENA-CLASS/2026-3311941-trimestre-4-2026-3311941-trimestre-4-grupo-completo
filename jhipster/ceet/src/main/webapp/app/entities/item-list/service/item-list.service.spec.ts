import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IItemList } from '../item-list.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../item-list.test-samples';

import { ItemListService } from './item-list.service';

const requireRestSample: IItemList = {
  ...sampleWithRequiredData,
};

describe('ItemList Service', () => {
  let service: ItemListService;
  let httpMock: HttpTestingController;
  let expectedResult: IItemList | IItemList[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ItemListService);
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

    it('should create a ItemList', () => {
      const itemList = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(itemList).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ItemList', () => {
      const itemList = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(itemList).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ItemList', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ItemList', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ItemList', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addItemListToCollectionIfMissing', () => {
      it('should add a ItemList to an empty array', () => {
        const itemList: IItemList = sampleWithRequiredData;
        expectedResult = service.addItemListToCollectionIfMissing([], itemList);
        expect(expectedResult).toEqual([itemList]);
      });

      it('should not add a ItemList to an array that contains it', () => {
        const itemList: IItemList = sampleWithRequiredData;
        const itemListCollection: IItemList[] = [
          {
            ...itemList,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addItemListToCollectionIfMissing(itemListCollection, itemList);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ItemList to an array that doesn't contain it", () => {
        const itemList: IItemList = sampleWithRequiredData;
        const itemListCollection: IItemList[] = [sampleWithPartialData];
        expectedResult = service.addItemListToCollectionIfMissing(itemListCollection, itemList);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemList);
      });

      it('should add only unique ItemList to an array', () => {
        const itemListArray: IItemList[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const itemListCollection: IItemList[] = [sampleWithRequiredData];
        expectedResult = service.addItemListToCollectionIfMissing(itemListCollection, ...itemListArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const itemList: IItemList = sampleWithRequiredData;
        const itemList2: IItemList = sampleWithPartialData;
        expectedResult = service.addItemListToCollectionIfMissing([], itemList, itemList2);
        expect(expectedResult).toEqual([itemList, itemList2]);
      });

      it('should accept null and undefined values', () => {
        const itemList: IItemList = sampleWithRequiredData;
        expectedResult = service.addItemListToCollectionIfMissing([], null, itemList, undefined);
        expect(expectedResult).toEqual([itemList]);
      });

      it('should return initial array if no ItemList is added', () => {
        const itemListCollection: IItemList[] = [sampleWithRequiredData];
        expectedResult = service.addItemListToCollectionIfMissing(itemListCollection, undefined, null);
        expect(expectedResult).toEqual(itemListCollection);
      });
    });

    describe('compareItemList', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareItemList(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' };
        const entity2 = null;

        const compareResult1 = service.compareItemList(entity1, entity2);
        const compareResult2 = service.compareItemList(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' };
        const entity2 = { id: 'ecdaac4d-d1f0-45d8-a82a-a8c15fe05153' };

        const compareResult1 = service.compareItemList(entity1, entity2);
        const compareResult2 = service.compareItemList(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' };
        const entity2 = { id: 'f5c01f94-408b-48fb-9301-893ca4de0dc0' };

        const compareResult1 = service.compareItemList(entity1, entity2);
        const compareResult2 = service.compareItemList(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
