import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../log-error.test-samples';

import { LogErrorFormService } from './log-error-form.service';

describe('LogError Form Service', () => {
  let service: LogErrorFormService;

  beforeEach(() => {
    service = TestBed.inject(LogErrorFormService);
  });

  describe('Service methods', () => {
    describe('createLogErrorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogErrorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            levelError: expect.any(Object),
            logName: expect.any(Object),
            messageError: expect.any(Object),
            dateError: expect.any(Object),
            customer: expect.any(Object),
          }),
        );
      });

      it('passing ILogError should create a new form with FormGroup', () => {
        const formGroup = service.createLogErrorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            levelError: expect.any(Object),
            logName: expect.any(Object),
            messageError: expect.any(Object),
            dateError: expect.any(Object),
            customer: expect.any(Object),
          }),
        );
      });
    });

    describe('getLogError', () => {
      it('should return NewLogError for default LogError initial value', () => {
        const formGroup = service.createLogErrorFormGroup(sampleWithNewData);

        const logError = service.getLogError(formGroup);

        expect(logError).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogError for empty LogError initial value', () => {
        const formGroup = service.createLogErrorFormGroup();

        const logError = service.getLogError(formGroup);

        expect(logError).toMatchObject({});
      });

      it('should return ILogError', () => {
        const formGroup = service.createLogErrorFormGroup(sampleWithRequiredData);

        const logError = service.getLogError(formGroup);

        expect(logError).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogError should not enable id FormControl', () => {
        const formGroup = service.createLogErrorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogError should disable id FormControl', () => {
        const formGroup = service.createLogErrorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
