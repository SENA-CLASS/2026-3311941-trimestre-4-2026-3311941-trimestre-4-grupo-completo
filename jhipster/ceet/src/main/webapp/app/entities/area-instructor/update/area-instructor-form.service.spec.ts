import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../area-instructor.test-samples';

import { AreaInstructorFormService } from './area-instructor-form.service';

describe('AreaInstructor Form Service', () => {
  let service: AreaInstructorFormService;

  beforeEach(() => {
    service = TestBed.inject(AreaInstructorFormService);
  });

  describe('Service methods', () => {
    describe('createAreaInstructorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAreaInstructorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            areaInstructorState: expect.any(Object),
            area: expect.any(Object),
            instructor: expect.any(Object),
          }),
        );
      });

      it('passing IAreaInstructor should create a new form with FormGroup', () => {
        const formGroup = service.createAreaInstructorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            areaInstructorState: expect.any(Object),
            area: expect.any(Object),
            instructor: expect.any(Object),
          }),
        );
      });
    });

    describe('getAreaInstructor', () => {
      it('should return NewAreaInstructor for default AreaInstructor initial value', () => {
        const formGroup = service.createAreaInstructorFormGroup(sampleWithNewData);

        const areaInstructor = service.getAreaInstructor(formGroup);

        expect(areaInstructor).toMatchObject(sampleWithNewData);
      });

      it('should return NewAreaInstructor for empty AreaInstructor initial value', () => {
        const formGroup = service.createAreaInstructorFormGroup();

        const areaInstructor = service.getAreaInstructor(formGroup);

        expect(areaInstructor).toMatchObject({});
      });

      it('should return IAreaInstructor', () => {
        const formGroup = service.createAreaInstructorFormGroup(sampleWithRequiredData);

        const areaInstructor = service.getAreaInstructor(formGroup);

        expect(areaInstructor).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAreaInstructor should not enable id FormControl', () => {
        const formGroup = service.createAreaInstructorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAreaInstructor should disable id FormControl', () => {
        const formGroup = service.createAreaInstructorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
