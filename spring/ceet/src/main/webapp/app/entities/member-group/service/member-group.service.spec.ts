import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IMemberGroup } from '../member-group.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../member-group.test-samples';

import { MemberGroupService } from './member-group.service';

const requireRestSample: IMemberGroup = {
  ...sampleWithRequiredData,
};

describe('MemberGroup Service', () => {
  let service: MemberGroupService;
  let httpMock: HttpTestingController;
  let expectedResult: IMemberGroup | IMemberGroup[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(MemberGroupService);
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

    it('should create a MemberGroup', () => {
      const memberGroup = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(memberGroup).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MemberGroup', () => {
      const memberGroup = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(memberGroup).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MemberGroup', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MemberGroup', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MemberGroup', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addMemberGroupToCollectionIfMissing', () => {
      it('should add a MemberGroup to an empty array', () => {
        const memberGroup: IMemberGroup = sampleWithRequiredData;
        expectedResult = service.addMemberGroupToCollectionIfMissing([], memberGroup);
        expect(expectedResult).toEqual([memberGroup]);
      });

      it('should not add a MemberGroup to an array that contains it', () => {
        const memberGroup: IMemberGroup = sampleWithRequiredData;
        const memberGroupCollection: IMemberGroup[] = [
          {
            ...memberGroup,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMemberGroupToCollectionIfMissing(memberGroupCollection, memberGroup);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MemberGroup to an array that doesn't contain it", () => {
        const memberGroup: IMemberGroup = sampleWithRequiredData;
        const memberGroupCollection: IMemberGroup[] = [sampleWithPartialData];
        expectedResult = service.addMemberGroupToCollectionIfMissing(memberGroupCollection, memberGroup);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(memberGroup);
      });

      it('should add only unique MemberGroup to an array', () => {
        const memberGroupArray: IMemberGroup[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const memberGroupCollection: IMemberGroup[] = [sampleWithRequiredData];
        expectedResult = service.addMemberGroupToCollectionIfMissing(memberGroupCollection, ...memberGroupArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const memberGroup: IMemberGroup = sampleWithRequiredData;
        const memberGroup2: IMemberGroup = sampleWithPartialData;
        expectedResult = service.addMemberGroupToCollectionIfMissing([], memberGroup, memberGroup2);
        expect(expectedResult).toEqual([memberGroup, memberGroup2]);
      });

      it('should accept null and undefined values', () => {
        const memberGroup: IMemberGroup = sampleWithRequiredData;
        expectedResult = service.addMemberGroupToCollectionIfMissing([], null, memberGroup, undefined);
        expect(expectedResult).toEqual([memberGroup]);
      });

      it('should return initial array if no MemberGroup is added', () => {
        const memberGroupCollection: IMemberGroup[] = [sampleWithRequiredData];
        expectedResult = service.addMemberGroupToCollectionIfMissing(memberGroupCollection, undefined, null);
        expect(expectedResult).toEqual(memberGroupCollection);
      });
    });

    describe('compareMemberGroup', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMemberGroup(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'aaafac9c-00f1-42dd-b0bb-5944cf56fc08' };
        const entity2 = null;

        const compareResult1 = service.compareMemberGroup(entity1, entity2);
        const compareResult2 = service.compareMemberGroup(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'aaafac9c-00f1-42dd-b0bb-5944cf56fc08' };
        const entity2 = { id: 'c2a1fa14-445f-49f5-ba37-551635dc0bb3' };

        const compareResult1 = service.compareMemberGroup(entity1, entity2);
        const compareResult2 = service.compareMemberGroup(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'aaafac9c-00f1-42dd-b0bb-5944cf56fc08' };
        const entity2 = { id: 'aaafac9c-00f1-42dd-b0bb-5944cf56fc08' };

        const compareResult1 = service.compareMemberGroup(entity1, entity2);
        const compareResult2 = service.compareMemberGroup(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
