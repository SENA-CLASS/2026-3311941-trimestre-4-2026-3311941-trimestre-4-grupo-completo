import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IInstructorWorkingDay } from '../instructor-working-day.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../instructor-working-day.test-samples';

import { InstructorWorkingDayService } from './instructor-working-day.service';

const requireRestSample: IInstructorWorkingDay = {
  ...sampleWithRequiredData,
};

describe('InstructorWorkingDay Service', () => {
  let service: InstructorWorkingDayService;
  let httpMock: HttpTestingController;
  let expectedResult: IInstructorWorkingDay | IInstructorWorkingDay[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(InstructorWorkingDayService);
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

    it('should create a InstructorWorkingDay', () => {
      const instructorWorkingDay = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(instructorWorkingDay).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InstructorWorkingDay', () => {
      const instructorWorkingDay = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(instructorWorkingDay).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InstructorWorkingDay', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InstructorWorkingDay', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a InstructorWorkingDay', () => {
      service.delete('ABC').subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addInstructorWorkingDayToCollectionIfMissing', () => {
      it('should add a InstructorWorkingDay to an empty array', () => {
        const instructorWorkingDay: IInstructorWorkingDay = sampleWithRequiredData;
        expectedResult = service.addInstructorWorkingDayToCollectionIfMissing([], instructorWorkingDay);
        expect(expectedResult).toEqual([instructorWorkingDay]);
      });

      it('should not add a InstructorWorkingDay to an array that contains it', () => {
        const instructorWorkingDay: IInstructorWorkingDay = sampleWithRequiredData;
        const instructorWorkingDayCollection: IInstructorWorkingDay[] = [
          {
            ...instructorWorkingDay,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInstructorWorkingDayToCollectionIfMissing(instructorWorkingDayCollection, instructorWorkingDay);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InstructorWorkingDay to an array that doesn't contain it", () => {
        const instructorWorkingDay: IInstructorWorkingDay = sampleWithRequiredData;
        const instructorWorkingDayCollection: IInstructorWorkingDay[] = [sampleWithPartialData];
        expectedResult = service.addInstructorWorkingDayToCollectionIfMissing(instructorWorkingDayCollection, instructorWorkingDay);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(instructorWorkingDay);
      });

      it('should add only unique InstructorWorkingDay to an array', () => {
        const instructorWorkingDayArray: IInstructorWorkingDay[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const instructorWorkingDayCollection: IInstructorWorkingDay[] = [sampleWithRequiredData];
        expectedResult = service.addInstructorWorkingDayToCollectionIfMissing(instructorWorkingDayCollection, ...instructorWorkingDayArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const instructorWorkingDay: IInstructorWorkingDay = sampleWithRequiredData;
        const instructorWorkingDay2: IInstructorWorkingDay = sampleWithPartialData;
        expectedResult = service.addInstructorWorkingDayToCollectionIfMissing([], instructorWorkingDay, instructorWorkingDay2);
        expect(expectedResult).toEqual([instructorWorkingDay, instructorWorkingDay2]);
      });

      it('should accept null and undefined values', () => {
        const instructorWorkingDay: IInstructorWorkingDay = sampleWithRequiredData;
        expectedResult = service.addInstructorWorkingDayToCollectionIfMissing([], null, instructorWorkingDay, undefined);
        expect(expectedResult).toEqual([instructorWorkingDay]);
      });

      it('should return initial array if no InstructorWorkingDay is added', () => {
        const instructorWorkingDayCollection: IInstructorWorkingDay[] = [sampleWithRequiredData];
        expectedResult = service.addInstructorWorkingDayToCollectionIfMissing(instructorWorkingDayCollection, undefined, null);
        expect(expectedResult).toEqual(instructorWorkingDayCollection);
      });
    });

    describe('compareInstructorWorkingDay', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInstructorWorkingDay(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
        const entity2 = null;

        const compareResult1 = service.compareInstructorWorkingDay(entity1, entity2);
        const compareResult2 = service.compareInstructorWorkingDay(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
        const entity2 = { id: 'ecdc811d-5dbd-4900-9650-efc8cb17608a' };

        const compareResult1 = service.compareInstructorWorkingDay(entity1, entity2);
        const compareResult2 = service.compareInstructorWorkingDay(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };
        const entity2 = { id: 'a6718508-6ea5-4a16-8155-bfbc48acf256' };

        const compareResult1 = service.compareInstructorWorkingDay(entity1, entity2);
        const compareResult2 = service.compareInstructorWorkingDay(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
