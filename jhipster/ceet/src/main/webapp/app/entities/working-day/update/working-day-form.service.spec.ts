import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../working-day.test-samples';

import { WorkingDayFormService } from './working-day-form.service';

describe('WorkingDay Form Service', () => {
  let service: WorkingDayFormService;

  beforeEach(() => {
    service = TestBed.inject(WorkingDayFormService);
  });

  describe('Service methods', () => {
    describe('createWorkingDayFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWorkingDayFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startTime: expect.any(Object),
            endTime: expect.any(Object),
            instructorWorkingDay: expect.any(Object),
            day: expect.any(Object),
          }),
        );
      });

      it('passing IWorkingDay should create a new form with FormGroup', () => {
        const formGroup = service.createWorkingDayFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startTime: expect.any(Object),
            endTime: expect.any(Object),
            instructorWorkingDay: expect.any(Object),
            day: expect.any(Object),
          }),
        );
      });
    });

    describe('getWorkingDay', () => {
      it('should return NewWorkingDay for default WorkingDay initial value', () => {
        const formGroup = service.createWorkingDayFormGroup(sampleWithNewData);

        const workingDay = service.getWorkingDay(formGroup);

        expect(workingDay).toMatchObject(sampleWithNewData);
      });

      it('should return NewWorkingDay for empty WorkingDay initial value', () => {
        const formGroup = service.createWorkingDayFormGroup();

        const workingDay = service.getWorkingDay(formGroup);

        expect(workingDay).toMatchObject({});
      });

      it('should return IWorkingDay', () => {
        const formGroup = service.createWorkingDayFormGroup(sampleWithRequiredData);

        const workingDay = service.getWorkingDay(formGroup);

        expect(workingDay).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWorkingDay should not enable id FormControl', () => {
        const formGroup = service.createWorkingDayFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWorkingDay should disable id FormControl', () => {
        const formGroup = service.createWorkingDayFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
