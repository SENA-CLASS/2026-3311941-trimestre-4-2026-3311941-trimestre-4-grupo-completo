import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../classroom-limitation.test-samples';

import { ClassroomLimitationFormService } from './classroom-limitation-form.service';

describe('ClassroomLimitation Form Service', () => {
  let service: ClassroomLimitationFormService;

  beforeEach(() => {
    service = TestBed.inject(ClassroomLimitationFormService);
  });

  describe('Service methods', () => {
    describe('createClassroomLimitationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createClassroomLimitationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            classroom: expect.any(Object),
            learningResult: expect.any(Object),
          }),
        );
      });

      it('passing IClassroomLimitation should create a new form with FormGroup', () => {
        const formGroup = service.createClassroomLimitationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            classroom: expect.any(Object),
            learningResult: expect.any(Object),
          }),
        );
      });
    });

    describe('getClassroomLimitation', () => {
      it('should return NewClassroomLimitation for default ClassroomLimitation initial value', () => {
        const formGroup = service.createClassroomLimitationFormGroup(sampleWithNewData);

        const classroomLimitation = service.getClassroomLimitation(formGroup);

        expect(classroomLimitation).toMatchObject(sampleWithNewData);
      });

      it('should return NewClassroomLimitation for empty ClassroomLimitation initial value', () => {
        const formGroup = service.createClassroomLimitationFormGroup();

        const classroomLimitation = service.getClassroomLimitation(formGroup);

        expect(classroomLimitation).toMatchObject({});
      });

      it('should return IClassroomLimitation', () => {
        const formGroup = service.createClassroomLimitationFormGroup(sampleWithRequiredData);

        const classroomLimitation = service.getClassroomLimitation(formGroup);

        expect(classroomLimitation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IClassroomLimitation should not enable id FormControl', () => {
        const formGroup = service.createClassroomLimitationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewClassroomLimitation should disable id FormControl', () => {
        const formGroup = service.createClassroomLimitationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
