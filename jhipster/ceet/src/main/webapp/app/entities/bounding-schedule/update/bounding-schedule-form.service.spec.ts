import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../bounding-schedule.test-samples';

import { BoundingScheduleFormService } from './bounding-schedule-form.service';

describe('BoundingSchedule Form Service', () => {
  let service: BoundingScheduleFormService;

  beforeEach(() => {
    service = TestBed.inject(BoundingScheduleFormService);
  });

  describe('Service methods', () => {
    describe('createBoundingScheduleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBoundingScheduleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bondingInstructor: expect.any(Object),
            instructorWorkingDay: expect.any(Object),
          }),
        );
      });

      it('passing IBoundingSchedule should create a new form with FormGroup', () => {
        const formGroup = service.createBoundingScheduleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bondingInstructor: expect.any(Object),
            instructorWorkingDay: expect.any(Object),
          }),
        );
      });
    });

    describe('getBoundingSchedule', () => {
      it('should return NewBoundingSchedule for default BoundingSchedule initial value', () => {
        const formGroup = service.createBoundingScheduleFormGroup(sampleWithNewData);

        const boundingSchedule = service.getBoundingSchedule(formGroup);

        expect(boundingSchedule).toMatchObject(sampleWithNewData);
      });

      it('should return NewBoundingSchedule for empty BoundingSchedule initial value', () => {
        const formGroup = service.createBoundingScheduleFormGroup();

        const boundingSchedule = service.getBoundingSchedule(formGroup);

        expect(boundingSchedule).toMatchObject({});
      });

      it('should return IBoundingSchedule', () => {
        const formGroup = service.createBoundingScheduleFormGroup(sampleWithRequiredData);

        const boundingSchedule = service.getBoundingSchedule(formGroup);

        expect(boundingSchedule).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBoundingSchedule should not enable id FormControl', () => {
        const formGroup = service.createBoundingScheduleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBoundingSchedule should disable id FormControl', () => {
        const formGroup = service.createBoundingScheduleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
