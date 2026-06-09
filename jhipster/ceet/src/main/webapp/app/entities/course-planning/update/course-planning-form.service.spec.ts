import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../course-planning.test-samples';

import { CoursePlanningFormService } from './course-planning-form.service';

describe('CoursePlanning Form Service', () => {
  let service: CoursePlanningFormService;

  beforeEach(() => {
    service = TestBed.inject(CoursePlanningFormService);
  });

  describe('Service methods', () => {
    describe('createCoursePlanningFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCoursePlanningFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stateCoursePlanning: expect.any(Object),
            course: expect.any(Object),
            planning: expect.any(Object),
          }),
        );
      });

      it('passing ICoursePlanning should create a new form with FormGroup', () => {
        const formGroup = service.createCoursePlanningFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stateCoursePlanning: expect.any(Object),
            course: expect.any(Object),
            planning: expect.any(Object),
          }),
        );
      });
    });

    describe('getCoursePlanning', () => {
      it('should return NewCoursePlanning for default CoursePlanning initial value', () => {
        const formGroup = service.createCoursePlanningFormGroup(sampleWithNewData);

        const coursePlanning = service.getCoursePlanning(formGroup);

        expect(coursePlanning).toMatchObject(sampleWithNewData);
      });

      it('should return NewCoursePlanning for empty CoursePlanning initial value', () => {
        const formGroup = service.createCoursePlanningFormGroup();

        const coursePlanning = service.getCoursePlanning(formGroup);

        expect(coursePlanning).toMatchObject({});
      });

      it('should return ICoursePlanning', () => {
        const formGroup = service.createCoursePlanningFormGroup(sampleWithRequiredData);

        const coursePlanning = service.getCoursePlanning(formGroup);

        expect(coursePlanning).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICoursePlanning should not enable id FormControl', () => {
        const formGroup = service.createCoursePlanningFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCoursePlanning should disable id FormControl', () => {
        const formGroup = service.createCoursePlanningFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
