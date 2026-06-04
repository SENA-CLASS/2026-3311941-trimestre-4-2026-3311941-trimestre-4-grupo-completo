import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IAreaInstructor } from '../area-instructor.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../area-instructor.test-samples';

import { AreaInstructorService } from './area-instructor.service';

const requireRestSample: IAreaInstructor = {
  ...sampleWithRequiredData,
};

describe('AreaInstructor Service', () => {
  let service: AreaInstructorService;
  let httpMock: HttpTestingController;
  let expectedResult: IAreaInstructor | IAreaInstructor[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AreaInstructorService);
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

    it('should create a AreaInstructor', () => {
      const areaInstructor = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(areaInstructor).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AreaInstructor', () => {
      const areaInstructor = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(areaInstructor).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AreaInstructor', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AreaInstructor', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AreaInstructor', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addAreaInstructorToCollectionIfMissing', () => {
      it('should add a AreaInstructor to an empty array', () => {
        const areaInstructor: IAreaInstructor = sampleWithRequiredData;
        expectedResult = service.addAreaInstructorToCollectionIfMissing([], areaInstructor);
        expect(expectedResult).toEqual([areaInstructor]);
      });

      it('should not add a AreaInstructor to an array that contains it', () => {
        const areaInstructor: IAreaInstructor = sampleWithRequiredData;
        const areaInstructorCollection: IAreaInstructor[] = [
          {
            ...areaInstructor,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAreaInstructorToCollectionIfMissing(areaInstructorCollection, areaInstructor);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AreaInstructor to an array that doesn't contain it", () => {
        const areaInstructor: IAreaInstructor = sampleWithRequiredData;
        const areaInstructorCollection: IAreaInstructor[] = [sampleWithPartialData];
        expectedResult = service.addAreaInstructorToCollectionIfMissing(areaInstructorCollection, areaInstructor);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(areaInstructor);
      });

      it('should add only unique AreaInstructor to an array', () => {
        const areaInstructorArray: IAreaInstructor[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const areaInstructorCollection: IAreaInstructor[] = [sampleWithRequiredData];
        expectedResult = service.addAreaInstructorToCollectionIfMissing(areaInstructorCollection, ...areaInstructorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const areaInstructor: IAreaInstructor = sampleWithRequiredData;
        const areaInstructor2: IAreaInstructor = sampleWithPartialData;
        expectedResult = service.addAreaInstructorToCollectionIfMissing([], areaInstructor, areaInstructor2);
        expect(expectedResult).toEqual([areaInstructor, areaInstructor2]);
      });

      it('should accept null and undefined values', () => {
        const areaInstructor: IAreaInstructor = sampleWithRequiredData;
        expectedResult = service.addAreaInstructorToCollectionIfMissing([], null, areaInstructor, undefined);
        expect(expectedResult).toEqual([areaInstructor]);
      });

      it('should return initial array if no AreaInstructor is added', () => {
        const areaInstructorCollection: IAreaInstructor[] = [sampleWithRequiredData];
        expectedResult = service.addAreaInstructorToCollectionIfMissing(areaInstructorCollection, undefined, null);
        expect(expectedResult).toEqual(areaInstructorCollection);
      });
    });

    describe('compareAreaInstructor', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAreaInstructor(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'e0befa69-d67d-40bf-beb0-9493374d7174' };
        const entity2 = null;

        const compareResult1 = service.compareAreaInstructor(entity1, entity2);
        const compareResult2 = service.compareAreaInstructor(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'e0befa69-d67d-40bf-beb0-9493374d7174' };
        const entity2 = { id: 'fb11d601-b709-4616-aaa1-0d126f7bd657' };

        const compareResult1 = service.compareAreaInstructor(entity1, entity2);
        const compareResult2 = service.compareAreaInstructor(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'e0befa69-d67d-40bf-beb0-9493374d7174' };
        const entity2 = { id: 'e0befa69-d67d-40bf-beb0-9493374d7174' };

        const compareResult1 = service.compareAreaInstructor(entity1, entity2);
        const compareResult2 = service.compareAreaInstructor(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
