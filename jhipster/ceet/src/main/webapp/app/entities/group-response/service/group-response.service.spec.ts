import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IGroupResponse } from '../group-response.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../group-response.test-samples';

import { GroupResponseService, RestGroupResponse } from './group-response.service';

const requireRestSample: RestGroupResponse = {
  ...sampleWithRequiredData,
  evaluationDate: sampleWithRequiredData.evaluationDate?.toJSON(),
};

describe('GroupResponse Service', () => {
  let service: GroupResponseService;
  let httpMock: HttpTestingController;
  let expectedResult: IGroupResponse | IGroupResponse[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(GroupResponseService);
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

    it('should create a GroupResponse', () => {
      const groupResponse = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(groupResponse).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GroupResponse', () => {
      const groupResponse = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(groupResponse).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GroupResponse', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GroupResponse', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GroupResponse', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addGroupResponseToCollectionIfMissing', () => {
      it('should add a GroupResponse to an empty array', () => {
        const groupResponse: IGroupResponse = sampleWithRequiredData;
        expectedResult = service.addGroupResponseToCollectionIfMissing([], groupResponse);
        expect(expectedResult).toEqual([groupResponse]);
      });

      it('should not add a GroupResponse to an array that contains it', () => {
        const groupResponse: IGroupResponse = sampleWithRequiredData;
        const groupResponseCollection: IGroupResponse[] = [
          {
            ...groupResponse,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGroupResponseToCollectionIfMissing(groupResponseCollection, groupResponse);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GroupResponse to an array that doesn't contain it", () => {
        const groupResponse: IGroupResponse = sampleWithRequiredData;
        const groupResponseCollection: IGroupResponse[] = [sampleWithPartialData];
        expectedResult = service.addGroupResponseToCollectionIfMissing(groupResponseCollection, groupResponse);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(groupResponse);
      });

      it('should add only unique GroupResponse to an array', () => {
        const groupResponseArray: IGroupResponse[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const groupResponseCollection: IGroupResponse[] = [sampleWithRequiredData];
        expectedResult = service.addGroupResponseToCollectionIfMissing(groupResponseCollection, ...groupResponseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const groupResponse: IGroupResponse = sampleWithRequiredData;
        const groupResponse2: IGroupResponse = sampleWithPartialData;
        expectedResult = service.addGroupResponseToCollectionIfMissing([], groupResponse, groupResponse2);
        expect(expectedResult).toEqual([groupResponse, groupResponse2]);
      });

      it('should accept null and undefined values', () => {
        const groupResponse: IGroupResponse = sampleWithRequiredData;
        expectedResult = service.addGroupResponseToCollectionIfMissing([], null, groupResponse, undefined);
        expect(expectedResult).toEqual([groupResponse]);
      });

      it('should return initial array if no GroupResponse is added', () => {
        const groupResponseCollection: IGroupResponse[] = [sampleWithRequiredData];
        expectedResult = service.addGroupResponseToCollectionIfMissing(groupResponseCollection, undefined, null);
        expect(expectedResult).toEqual(groupResponseCollection);
      });
    });

    describe('compareGroupResponse', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGroupResponse(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '57b45d23-226e-48e7-93c6-046bd207c9c6' };
        const entity2 = null;

        const compareResult1 = service.compareGroupResponse(entity1, entity2);
        const compareResult2 = service.compareGroupResponse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '57b45d23-226e-48e7-93c6-046bd207c9c6' };
        const entity2 = { id: 'e20ecb71-d9ec-4694-82c9-f26362300c8f' };

        const compareResult1 = service.compareGroupResponse(entity1, entity2);
        const compareResult2 = service.compareGroupResponse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '57b45d23-226e-48e7-93c6-046bd207c9c6' };
        const entity2 = { id: '57b45d23-226e-48e7-93c6-046bd207c9c6' };

        const compareResult1 = service.compareGroupResponse(entity1, entity2);
        const compareResult2 = service.compareGroupResponse(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
