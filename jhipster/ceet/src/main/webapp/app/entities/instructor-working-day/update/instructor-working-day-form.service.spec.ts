import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../instructor-working-day.test-samples';

import { InstructorWorkingDayFormService } from './instructor-working-day-form.service';

describe('InstructorWorkingDay Form Service', () => {
  let service: InstructorWorkingDayFormService;

  beforeEach(() => {
    service = TestBed.inject(InstructorWorkingDayFormService);
  });

  describe('Service methods', () => {
    describe('createInstructorWorkingDayFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInstructorWorkingDayFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nameWorkingDay: expect.any(Object),
            descriptionWorkingDay: expect.any(Object),
            workingDayState: expect.any(Object),
          }),
        );
      });

      it('passing IInstructorWorkingDay should create a new form with FormGroup', () => {
        const formGroup = service.createInstructorWorkingDayFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nameWorkingDay: expect.any(Object),
            descriptionWorkingDay: expect.any(Object),
            workingDayState: expect.any(Object),
          }),
        );
      });
    });

    describe('getInstructorWorkingDay', () => {
      it('should return NewInstructorWorkingDay for default InstructorWorkingDay initial value', () => {
        const formGroup = service.createInstructorWorkingDayFormGroup(sampleWithNewData);

        const instructorWorkingDay = service.getInstructorWorkingDay(formGroup);

        expect(instructorWorkingDay).toMatchObject(sampleWithNewData);
      });

      it('should return NewInstructorWorkingDay for empty InstructorWorkingDay initial value', () => {
        const formGroup = service.createInstructorWorkingDayFormGroup();

        const instructorWorkingDay = service.getInstructorWorkingDay(formGroup);

        expect(instructorWorkingDay).toMatchObject({});
      });

      it('should return IInstructorWorkingDay', () => {
        const formGroup = service.createInstructorWorkingDayFormGroup(sampleWithRequiredData);

        const instructorWorkingDay = service.getInstructorWorkingDay(formGroup);

        expect(instructorWorkingDay).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInstructorWorkingDay should not enable id FormControl', () => {
        const formGroup = service.createInstructorWorkingDayFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInstructorWorkingDay should disable id FormControl', () => {
        const formGroup = service.createInstructorWorkingDayFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
