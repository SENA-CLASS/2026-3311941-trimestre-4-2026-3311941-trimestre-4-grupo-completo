import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../trimester.test-samples';

import { TrimesterFormService } from './trimester-form.service';

describe('Trimester Form Service', () => {
  let service: TrimesterFormService;

  beforeEach(() => {
    service = TestBed.inject(TrimesterFormService);
  });

  describe('Service methods', () => {
    describe('createTrimesterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTrimesterFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            trimesterName: expect.any(Object),
            trimesterState: expect.any(Object),
            workingDayCourse: expect.any(Object),
            levelEducations: expect.any(Object),
          }),
        );
      });

      it('passing ITrimester should create a new form with FormGroup', () => {
        const formGroup = service.createTrimesterFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            trimesterName: expect.any(Object),
            trimesterState: expect.any(Object),
            workingDayCourse: expect.any(Object),
            levelEducations: expect.any(Object),
          }),
        );
      });
    });

    describe('getTrimester', () => {
      it('should return NewTrimester for default Trimester initial value', () => {
        const formGroup = service.createTrimesterFormGroup(sampleWithNewData);

        const trimester = service.getTrimester(formGroup);

        expect(trimester).toMatchObject(sampleWithNewData);
      });

      it('should return NewTrimester for empty Trimester initial value', () => {
        const formGroup = service.createTrimesterFormGroup();

        const trimester = service.getTrimester(formGroup);

        expect(trimester).toMatchObject({});
      });

      it('should return ITrimester', () => {
        const formGroup = service.createTrimesterFormGroup(sampleWithRequiredData);

        const trimester = service.getTrimester(formGroup);

        expect(trimester).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITrimester should not enable id FormControl', () => {
        const formGroup = service.createTrimesterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTrimester should disable id FormControl', () => {
        const formGroup = service.createTrimesterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
