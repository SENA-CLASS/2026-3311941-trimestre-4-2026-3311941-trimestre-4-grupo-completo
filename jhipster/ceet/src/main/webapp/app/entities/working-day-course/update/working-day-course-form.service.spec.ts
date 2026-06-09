import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../working-day-course.test-samples';

import { WorkingDayCourseFormService } from './working-day-course-form.service';

describe('WorkingDayCourse Form Service', () => {
  let service: WorkingDayCourseFormService;

  beforeEach(() => {
    service = TestBed.inject(WorkingDayCourseFormService);
  });

  describe('Service methods', () => {
    describe('createWorkingDayCourseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWorkingDayCourseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            workingDayAcronym: expect.any(Object),
            workingDayName: expect.any(Object),
            description: expect.any(Object),
            imageUrl: expect.any(Object),
            stateWorkingDay: expect.any(Object),
          }),
        );
      });

      it('passing IWorkingDayCourse should create a new form with FormGroup', () => {
        const formGroup = service.createWorkingDayCourseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            workingDayAcronym: expect.any(Object),
            workingDayName: expect.any(Object),
            description: expect.any(Object),
            imageUrl: expect.any(Object),
            stateWorkingDay: expect.any(Object),
          }),
        );
      });
    });

    describe('getWorkingDayCourse', () => {
      it('should return NewWorkingDayCourse for default WorkingDayCourse initial value', () => {
        const formGroup = service.createWorkingDayCourseFormGroup(sampleWithNewData);

        const workingDayCourse = service.getWorkingDayCourse(formGroup);

        expect(workingDayCourse).toMatchObject(sampleWithNewData);
      });

      it('should return NewWorkingDayCourse for empty WorkingDayCourse initial value', () => {
        const formGroup = service.createWorkingDayCourseFormGroup();

        const workingDayCourse = service.getWorkingDayCourse(formGroup);

        expect(workingDayCourse).toMatchObject({});
      });

      it('should return IWorkingDayCourse', () => {
        const formGroup = service.createWorkingDayCourseFormGroup(sampleWithRequiredData);

        const workingDayCourse = service.getWorkingDayCourse(formGroup);

        expect(workingDayCourse).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWorkingDayCourse should not enable id FormControl', () => {
        const formGroup = service.createWorkingDayCourseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWorkingDayCourse should disable id FormControl', () => {
        const formGroup = service.createWorkingDayCourseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
