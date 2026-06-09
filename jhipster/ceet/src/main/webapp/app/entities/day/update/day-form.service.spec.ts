import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../day.test-samples';

import { DayFormService } from './day-form.service';

describe('Day Form Service', () => {
  let service: DayFormService;

  beforeEach(() => {
    service = TestBed.inject(DayFormService);
  });

  describe('Service methods', () => {
    describe('createDayFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDayFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dayName: expect.any(Object),
            dayState: expect.any(Object),
          }),
        );
      });

      it('passing IDay should create a new form with FormGroup', () => {
        const formGroup = service.createDayFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dayName: expect.any(Object),
            dayState: expect.any(Object),
          }),
        );
      });
    });

    describe('getDay', () => {
      it('should return NewDay for default Day initial value', () => {
        const formGroup = service.createDayFormGroup(sampleWithNewData);

        const day = service.getDay(formGroup);

        expect(day).toMatchObject(sampleWithNewData);
      });

      it('should return NewDay for empty Day initial value', () => {
        const formGroup = service.createDayFormGroup();

        const day = service.getDay(formGroup);

        expect(day).toMatchObject({});
      });

      it('should return IDay', () => {
        const formGroup = service.createDayFormGroup(sampleWithRequiredData);

        const day = service.getDay(formGroup);

        expect(day).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDay should not enable id FormControl', () => {
        const formGroup = service.createDayFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDay should disable id FormControl', () => {
        const formGroup = service.createDayFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
