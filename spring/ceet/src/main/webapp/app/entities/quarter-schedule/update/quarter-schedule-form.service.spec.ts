import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../quarter-schedule.test-samples';

import { QuarterScheduleFormService } from './quarter-schedule-form.service';

describe('QuarterSchedule Form Service', () => {
  let service: QuarterScheduleFormService;

  beforeEach(() => {
    service = TestBed.inject(QuarterScheduleFormService);
  });

  describe('Service methods', () => {
    describe('createQuarterScheduleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuarterScheduleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            learningResult: expect.any(Object),
            planning: expect.any(Object),
            trimester: expect.any(Object),
          }),
        );
      });

      it('passing IQuarterSchedule should create a new form with FormGroup', () => {
        const formGroup = service.createQuarterScheduleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            learningResult: expect.any(Object),
            planning: expect.any(Object),
            trimester: expect.any(Object),
          }),
        );
      });
    });

    describe('getQuarterSchedule', () => {
      it('should return NewQuarterSchedule for default QuarterSchedule initial value', () => {
        const formGroup = service.createQuarterScheduleFormGroup(sampleWithNewData);

        const quarterSchedule = service.getQuarterSchedule(formGroup);

        expect(quarterSchedule).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuarterSchedule for empty QuarterSchedule initial value', () => {
        const formGroup = service.createQuarterScheduleFormGroup();

        const quarterSchedule = service.getQuarterSchedule(formGroup);

        expect(quarterSchedule).toMatchObject({});
      });

      it('should return IQuarterSchedule', () => {
        const formGroup = service.createQuarterScheduleFormGroup(sampleWithRequiredData);

        const quarterSchedule = service.getQuarterSchedule(formGroup);

        expect(quarterSchedule).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuarterSchedule should not enable id FormControl', () => {
        const formGroup = service.createQuarterScheduleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuarterSchedule should disable id FormControl', () => {
        const formGroup = service.createQuarterScheduleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
