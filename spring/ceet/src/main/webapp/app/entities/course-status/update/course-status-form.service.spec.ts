import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../course-status.test-samples';

import { CourseStatusFormService } from './course-status-form.service';

describe('CourseStatus Form Service', () => {
  let service: CourseStatusFormService;

  beforeEach(() => {
    service = TestBed.inject(CourseStatusFormService);
  });

  describe('Service methods', () => {
    describe('createCourseStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCourseStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nameCourseStatus: expect.any(Object),
            stateCourse: expect.any(Object),
          }),
        );
      });

      it('passing ICourseStatus should create a new form with FormGroup', () => {
        const formGroup = service.createCourseStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nameCourseStatus: expect.any(Object),
            stateCourse: expect.any(Object),
          }),
        );
      });
    });

    describe('getCourseStatus', () => {
      it('should return NewCourseStatus for default CourseStatus initial value', () => {
        const formGroup = service.createCourseStatusFormGroup(sampleWithNewData);

        const courseStatus = service.getCourseStatus(formGroup);

        expect(courseStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewCourseStatus for empty CourseStatus initial value', () => {
        const formGroup = service.createCourseStatusFormGroup();

        const courseStatus = service.getCourseStatus(formGroup);

        expect(courseStatus).toMatchObject({});
      });

      it('should return ICourseStatus', () => {
        const formGroup = service.createCourseStatusFormGroup(sampleWithRequiredData);

        const courseStatus = service.getCourseStatus(formGroup);

        expect(courseStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICourseStatus should not enable id FormControl', () => {
        const formGroup = service.createCourseStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCourseStatus should disable id FormControl', () => {
        const formGroup = service.createCourseStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
