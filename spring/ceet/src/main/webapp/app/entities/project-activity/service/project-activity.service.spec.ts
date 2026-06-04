import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IProjectActivity } from '../project-activity.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../project-activity.test-samples';

import { ProjectActivityService } from './project-activity.service';

const requireRestSample: IProjectActivity = {
  ...sampleWithRequiredData,
};

describe('ProjectActivity Service', () => {
  let service: ProjectActivityService;
  let httpMock: HttpTestingController;
  let expectedResult: IProjectActivity | IProjectActivity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ProjectActivityService);
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

    it('should create a ProjectActivity', () => {
      const projectActivity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(projectActivity).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProjectActivity', () => {
      const projectActivity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(projectActivity).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProjectActivity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProjectActivity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProjectActivity', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addProjectActivityToCollectionIfMissing', () => {
      it('should add a ProjectActivity to an empty array', () => {
        const projectActivity: IProjectActivity = sampleWithRequiredData;
        expectedResult = service.addProjectActivityToCollectionIfMissing([], projectActivity);
        expect(expectedResult).toEqual([projectActivity]);
      });

      it('should not add a ProjectActivity to an array that contains it', () => {
        const projectActivity: IProjectActivity = sampleWithRequiredData;
        const projectActivityCollection: IProjectActivity[] = [
          {
            ...projectActivity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProjectActivityToCollectionIfMissing(projectActivityCollection, projectActivity);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProjectActivity to an array that doesn't contain it", () => {
        const projectActivity: IProjectActivity = sampleWithRequiredData;
        const projectActivityCollection: IProjectActivity[] = [sampleWithPartialData];
        expectedResult = service.addProjectActivityToCollectionIfMissing(projectActivityCollection, projectActivity);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(projectActivity);
      });

      it('should add only unique ProjectActivity to an array', () => {
        const projectActivityArray: IProjectActivity[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const projectActivityCollection: IProjectActivity[] = [sampleWithRequiredData];
        expectedResult = service.addProjectActivityToCollectionIfMissing(projectActivityCollection, ...projectActivityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const projectActivity: IProjectActivity = sampleWithRequiredData;
        const projectActivity2: IProjectActivity = sampleWithPartialData;
        expectedResult = service.addProjectActivityToCollectionIfMissing([], projectActivity, projectActivity2);
        expect(expectedResult).toEqual([projectActivity, projectActivity2]);
      });

      it('should accept null and undefined values', () => {
        const projectActivity: IProjectActivity = sampleWithRequiredData;
        expectedResult = service.addProjectActivityToCollectionIfMissing([], null, projectActivity, undefined);
        expect(expectedResult).toEqual([projectActivity]);
      });

      it('should return initial array if no ProjectActivity is added', () => {
        const projectActivityCollection: IProjectActivity[] = [sampleWithRequiredData];
        expectedResult = service.addProjectActivityToCollectionIfMissing(projectActivityCollection, undefined, null);
        expect(expectedResult).toEqual(projectActivityCollection);
      });
    });

    describe('compareProjectActivity', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProjectActivity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' };
        const entity2 = null;

        const compareResult1 = service.compareProjectActivity(entity1, entity2);
        const compareResult2 = service.compareProjectActivity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' };
        const entity2 = { id: '8fcd62e7-dc0e-453c-a593-0e57d65f34de' };

        const compareResult1 = service.compareProjectActivity(entity1, entity2);
        const compareResult2 = service.compareProjectActivity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' };
        const entity2 = { id: 'ce18f414-2724-443b-a81a-1f9d591eb13c' };

        const compareResult1 = service.compareProjectActivity(entity1, entity2);
        const compareResult2 = service.compareProjectActivity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
