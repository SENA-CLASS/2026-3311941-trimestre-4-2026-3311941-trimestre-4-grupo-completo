import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../apprentice.test-samples';

import { ApprenticeFormService } from './apprentice-form.service';

describe('Apprentice Form Service', () => {
  let service: ApprenticeFormService;

  beforeEach(() => {
    service = TestBed.inject(ApprenticeFormService);
  });

  describe('Service methods', () => {
    describe('createApprenticeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createApprenticeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customer: expect.any(Object),
            trainingStatus: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });

      it('passing IApprentice should create a new form with FormGroup', () => {
        const formGroup = service.createApprenticeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customer: expect.any(Object),
            trainingStatus: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });
    });

    describe('getApprentice', () => {
      it('should return NewApprentice for default Apprentice initial value', () => {
        const formGroup = service.createApprenticeFormGroup(sampleWithNewData);

        const apprentice = service.getApprentice(formGroup);

        expect(apprentice).toMatchObject(sampleWithNewData);
      });

      it('should return NewApprentice for empty Apprentice initial value', () => {
        const formGroup = service.createApprenticeFormGroup();

        const apprentice = service.getApprentice(formGroup);

        expect(apprentice).toMatchObject({});
      });

      it('should return IApprentice', () => {
        const formGroup = service.createApprenticeFormGroup(sampleWithRequiredData);

        const apprentice = service.getApprentice(formGroup);

        expect(apprentice).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IApprentice should not enable id FormControl', () => {
        const formGroup = service.createApprenticeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewApprentice should disable id FormControl', () => {
        const formGroup = service.createApprenticeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
