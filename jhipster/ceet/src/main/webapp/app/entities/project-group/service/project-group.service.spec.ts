import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IProjectGroup } from '../project-group.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../project-group.test-samples';

import { ProjectGroupService } from './project-group.service';

const requireRestSample: IProjectGroup = {
  ...sampleWithRequiredData,
};

describe('ProjectGroup Service', () => {
  let service: ProjectGroupService;
  let httpMock: HttpTestingController;
  let expectedResult: IProjectGroup | IProjectGroup[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ProjectGroupService);
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

    it('should create a ProjectGroup', () => {
      const projectGroup = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(projectGroup).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProjectGroup', () => {
      const projectGroup = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(projectGroup).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProjectGroup', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProjectGroup', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProjectGroup', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addProjectGroupToCollectionIfMissing', () => {
      it('should add a ProjectGroup to an empty array', () => {
        const projectGroup: IProjectGroup = sampleWithRequiredData;
        expectedResult = service.addProjectGroupToCollectionIfMissing([], projectGroup);
        expect(expectedResult).toEqual([projectGroup]);
      });

      it('should not add a ProjectGroup to an array that contains it', () => {
        const projectGroup: IProjectGroup = sampleWithRequiredData;
        const projectGroupCollection: IProjectGroup[] = [
          {
            ...projectGroup,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProjectGroupToCollectionIfMissing(projectGroupCollection, projectGroup);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProjectGroup to an array that doesn't contain it", () => {
        const projectGroup: IProjectGroup = sampleWithRequiredData;
        const projectGroupCollection: IProjectGroup[] = [sampleWithPartialData];
        expectedResult = service.addProjectGroupToCollectionIfMissing(projectGroupCollection, projectGroup);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(projectGroup);
      });

      it('should add only unique ProjectGroup to an array', () => {
        const projectGroupArray: IProjectGroup[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const projectGroupCollection: IProjectGroup[] = [sampleWithRequiredData];
        expectedResult = service.addProjectGroupToCollectionIfMissing(projectGroupCollection, ...projectGroupArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const projectGroup: IProjectGroup = sampleWithRequiredData;
        const projectGroup2: IProjectGroup = sampleWithPartialData;
        expectedResult = service.addProjectGroupToCollectionIfMissing([], projectGroup, projectGroup2);
        expect(expectedResult).toEqual([projectGroup, projectGroup2]);
      });

      it('should accept null and undefined values', () => {
        const projectGroup: IProjectGroup = sampleWithRequiredData;
        expectedResult = service.addProjectGroupToCollectionIfMissing([], null, projectGroup, undefined);
        expect(expectedResult).toEqual([projectGroup]);
      });

      it('should return initial array if no ProjectGroup is added', () => {
        const projectGroupCollection: IProjectGroup[] = [sampleWithRequiredData];
        expectedResult = service.addProjectGroupToCollectionIfMissing(projectGroupCollection, undefined, null);
        expect(expectedResult).toEqual(projectGroupCollection);
      });
    });

    describe('compareProjectGroup', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProjectGroup(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
        const entity2 = null;

        const compareResult1 = service.compareProjectGroup(entity1, entity2);
        const compareResult2 = service.compareProjectGroup(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
        const entity2 = { id: 'e32c8573-0365-4601-97ff-335f74d06785' };

        const compareResult1 = service.compareProjectGroup(entity1, entity2);
        const compareResult2 = service.compareProjectGroup(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };
        const entity2 = { id: '09699592-062b-40e5-aa51-6ed07e22b997' };

        const compareResult1 = service.compareProjectGroup(entity1, entity2);
        const compareResult2 = service.compareProjectGroup(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
