import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../log-audit.test-samples';

import { LogAuditFormService } from './log-audit-form.service';

describe('LogAudit Form Service', () => {
  let service: LogAuditFormService;

  beforeEach(() => {
    service = TestBed.inject(LogAuditFormService);
  });

  describe('Service methods', () => {
    describe('createLogAuditFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogAuditFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            levelAudit: expect.any(Object),
            logName: expect.any(Object),
            messageAudit: expect.any(Object),
            dateAudit: expect.any(Object),
            customer: expect.any(Object),
          }),
        );
      });

      it('passing ILogAudit should create a new form with FormGroup', () => {
        const formGroup = service.createLogAuditFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            levelAudit: expect.any(Object),
            logName: expect.any(Object),
            messageAudit: expect.any(Object),
            dateAudit: expect.any(Object),
            customer: expect.any(Object),
          }),
        );
      });
    });

    describe('getLogAudit', () => {
      it('should return NewLogAudit for default LogAudit initial value', () => {
        const formGroup = service.createLogAuditFormGroup(sampleWithNewData);

        const logAudit = service.getLogAudit(formGroup);

        expect(logAudit).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogAudit for empty LogAudit initial value', () => {
        const formGroup = service.createLogAuditFormGroup();

        const logAudit = service.getLogAudit(formGroup);

        expect(logAudit).toMatchObject({});
      });

      it('should return ILogAudit', () => {
        const formGroup = service.createLogAuditFormGroup(sampleWithRequiredData);

        const logAudit = service.getLogAudit(formGroup);

        expect(logAudit).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogAudit should not enable id FormControl', () => {
        const formGroup = service.createLogAuditFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogAudit should disable id FormControl', () => {
        const formGroup = service.createLogAuditFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
