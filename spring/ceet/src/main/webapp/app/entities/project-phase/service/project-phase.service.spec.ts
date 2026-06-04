import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IProjectPhase } from '../project-phase.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../project-phase.test-samples';

import { ProjectPhaseService } from './project-phase.service';

const requireRestSample: IProjectPhase = {
  ...sampleWithRequiredData,
};

describe('ProjectPhase Service', () => {
  let service: ProjectPhaseService;
  let httpMock: HttpTestingController;
  let expectedResult: IProjectPhase | IProjectPhase[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ProjectPhaseService);
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

    it('should create a ProjectPhase', () => {
      const projectPhase = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(projectPhase).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProjectPhase', () => {
      const projectPhase = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(projectPhase).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProjectPhase', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProjectPhase', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProjectPhase', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addProjectPhaseToCollectionIfMissing', () => {
      it('should add a ProjectPhase to an empty array', () => {
        const projectPhase: IProjectPhase = sampleWithRequiredData;
        expectedResult = service.addProjectPhaseToCollectionIfMissing([], projectPhase);
        expect(expectedResult).toEqual([projectPhase]);
      });

      it('should not add a ProjectPhase to an array that contains it', () => {
        const projectPhase: IProjectPhase = sampleWithRequiredData;
        const projectPhaseCollection: IProjectPhase[] = [
          {
            ...projectPhase,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProjectPhaseToCollectionIfMissing(projectPhaseCollection, projectPhase);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProjectPhase to an array that doesn't contain it", () => {
        const projectPhase: IProjectPhase = sampleWithRequiredData;
        const projectPhaseCollection: IProjectPhase[] = [sampleWithPartialData];
        expectedResult = service.addProjectPhaseToCollectionIfMissing(projectPhaseCollection, projectPhase);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(projectPhase);
      });

      it('should add only unique ProjectPhase to an array', () => {
        const projectPhaseArray: IProjectPhase[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const projectPhaseCollection: IProjectPhase[] = [sampleWithRequiredData];
        expectedResult = service.addProjectPhaseToCollectionIfMissing(projectPhaseCollection, ...projectPhaseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const projectPhase: IProjectPhase = sampleWithRequiredData;
        const projectPhase2: IProjectPhase = sampleWithPartialData;
        expectedResult = service.addProjectPhaseToCollectionIfMissing([], projectPhase, projectPhase2);
        expect(expectedResult).toEqual([projectPhase, projectPhase2]);
      });

      it('should accept null and undefined values', () => {
        const projectPhase: IProjectPhase = sampleWithRequiredData;
        expectedResult = service.addProjectPhaseToCollectionIfMissing([], null, projectPhase, undefined);
        expect(expectedResult).toEqual([projectPhase]);
      });

      it('should return initial array if no ProjectPhase is added', () => {
        const projectPhaseCollection: IProjectPhase[] = [sampleWithRequiredData];
        expectedResult = service.addProjectPhaseToCollectionIfMissing(projectPhaseCollection, undefined, null);
        expect(expectedResult).toEqual(projectPhaseCollection);
      });
    });

    describe('compareProjectPhase', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProjectPhase(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' };
        const entity2 = null;

        const compareResult1 = service.compareProjectPhase(entity1, entity2);
        const compareResult2 = service.compareProjectPhase(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' };
        const entity2 = { id: 'f66f01f6-089b-45fa-8a8f-13705ed76a37' };

        const compareResult1 = service.compareProjectPhase(entity1, entity2);
        const compareResult2 = service.compareProjectPhase(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' };
        const entity2 = { id: 'd6306830-4cd7-49d4-ae49-a650a81278f2' };

        const compareResult1 = service.compareProjectPhase(entity1, entity2);
        const compareResult2 = service.compareProjectPhase(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
