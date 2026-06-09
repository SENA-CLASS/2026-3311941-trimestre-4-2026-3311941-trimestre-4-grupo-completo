import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../course-trimester.test-samples';

import { CourseTrimesterFormService } from './course-trimester-form.service';

describe('CourseTrimester Form Service', () => {
  let service: CourseTrimesterFormService;

  beforeEach(() => {
    service = TestBed.inject(CourseTrimesterFormService);
  });

  describe('Service methods', () => {
    describe('createCourseTrimesterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCourseTrimesterFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            course: expect.any(Object),
            trimester: expect.any(Object),
          }),
        );
      });

      it('passing ICourseTrimester should create a new form with FormGroup', () => {
        const formGroup = service.createCourseTrimesterFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            course: expect.any(Object),
            trimester: expect.any(Object),
          }),
        );
      });
    });

    describe('getCourseTrimester', () => {
      it('should return NewCourseTrimester for default CourseTrimester initial value', () => {
        const formGroup = service.createCourseTrimesterFormGroup(sampleWithNewData);

        const courseTrimester = service.getCourseTrimester(formGroup);

        expect(courseTrimester).toMatchObject(sampleWithNewData);
      });

      it('should return NewCourseTrimester for empty CourseTrimester initial value', () => {
        const formGroup = service.createCourseTrimesterFormGroup();

        const courseTrimester = service.getCourseTrimester(formGroup);

        expect(courseTrimester).toMatchObject({});
      });

      it('should return ICourseTrimester', () => {
        const formGroup = service.createCourseTrimesterFormGroup(sampleWithRequiredData);

        const courseTrimester = service.getCourseTrimester(formGroup);

        expect(courseTrimester).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICourseTrimester should not enable id FormControl', () => {
        const formGroup = service.createCourseTrimesterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCourseTrimester should disable id FormControl', () => {
        const formGroup = service.createCourseTrimesterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
