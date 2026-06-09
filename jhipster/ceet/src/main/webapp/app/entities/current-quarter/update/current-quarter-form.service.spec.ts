import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../current-quarter.test-samples';

import { CurrentQuarterFormService } from './current-quarter-form.service';

describe('CurrentQuarter Form Service', () => {
  let service: CurrentQuarterFormService;

  beforeEach(() => {
    service = TestBed.inject(CurrentQuarterFormService);
  });

  describe('Service methods', () => {
    describe('createCurrentQuarterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCurrentQuarterFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            scheduledQuarter: expect.any(Object),
            startQuarter: expect.any(Object),
            endQuarter: expect.any(Object),
            currentQuarterState: expect.any(Object),
            year: expect.any(Object),
          }),
        );
      });

      it('passing ICurrentQuarter should create a new form with FormGroup', () => {
        const formGroup = service.createCurrentQuarterFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            scheduledQuarter: expect.any(Object),
            startQuarter: expect.any(Object),
            endQuarter: expect.any(Object),
            currentQuarterState: expect.any(Object),
            year: expect.any(Object),
          }),
        );
      });
    });

    describe('getCurrentQuarter', () => {
      it('should return NewCurrentQuarter for default CurrentQuarter initial value', () => {
        const formGroup = service.createCurrentQuarterFormGroup(sampleWithNewData);

        const currentQuarter = service.getCurrentQuarter(formGroup);

        expect(currentQuarter).toMatchObject(sampleWithNewData);
      });

      it('should return NewCurrentQuarter for empty CurrentQuarter initial value', () => {
        const formGroup = service.createCurrentQuarterFormGroup();

        const currentQuarter = service.getCurrentQuarter(formGroup);

        expect(currentQuarter).toMatchObject({});
      });

      it('should return ICurrentQuarter', () => {
        const formGroup = service.createCurrentQuarterFormGroup(sampleWithRequiredData);

        const currentQuarter = service.getCurrentQuarter(formGroup);

        expect(currentQuarter).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICurrentQuarter should not enable id FormControl', () => {
        const formGroup = service.createCurrentQuarterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCurrentQuarter should disable id FormControl', () => {
        const formGroup = service.createCurrentQuarterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
