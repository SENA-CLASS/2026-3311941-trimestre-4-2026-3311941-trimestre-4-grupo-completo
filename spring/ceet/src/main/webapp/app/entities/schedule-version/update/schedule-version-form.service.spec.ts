import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../schedule-version.test-samples';

import { ScheduleVersionFormService } from './schedule-version-form.service';

describe('ScheduleVersion Form Service', () => {
  let service: ScheduleVersionFormService;

  beforeEach(() => {
    service = TestBed.inject(ScheduleVersionFormService);
  });

  describe('Service methods', () => {
    describe('createScheduleVersionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createScheduleVersionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            versionNumber: expect.any(Object),
            versionState: expect.any(Object),
            currentQuarter: expect.any(Object),
          }),
        );
      });

      it('passing IScheduleVersion should create a new form with FormGroup', () => {
        const formGroup = service.createScheduleVersionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            versionNumber: expect.any(Object),
            versionState: expect.any(Object),
            currentQuarter: expect.any(Object),
          }),
        );
      });
    });

    describe('getScheduleVersion', () => {
      it('should return NewScheduleVersion for default ScheduleVersion initial value', () => {
        const formGroup = service.createScheduleVersionFormGroup(sampleWithNewData);

        const scheduleVersion = service.getScheduleVersion(formGroup);

        expect(scheduleVersion).toMatchObject(sampleWithNewData);
      });

      it('should return NewScheduleVersion for empty ScheduleVersion initial value', () => {
        const formGroup = service.createScheduleVersionFormGroup();

        const scheduleVersion = service.getScheduleVersion(formGroup);

        expect(scheduleVersion).toMatchObject({});
      });

      it('should return IScheduleVersion', () => {
        const formGroup = service.createScheduleVersionFormGroup(sampleWithRequiredData);

        const scheduleVersion = service.getScheduleVersion(formGroup);

        expect(scheduleVersion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IScheduleVersion should not enable id FormControl', () => {
        const formGroup = service.createScheduleVersionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewScheduleVersion should disable id FormControl', () => {
        const formGroup = service.createScheduleVersionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
