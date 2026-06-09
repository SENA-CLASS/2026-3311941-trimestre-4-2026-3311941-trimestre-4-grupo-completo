import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../learning-result.test-samples';

import { LearningResultFormService } from './learning-result-form.service';

describe('LearningResult Form Service', () => {
  let service: LearningResultFormService;

  beforeEach(() => {
    service = TestBed.inject(LearningResultFormService);
  });

  describe('Service methods', () => {
    describe('createLearningResultFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLearningResultFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            resultCode: expect.any(Object),
            denomination: expect.any(Object),
            learningCompetence: expect.any(Object),
          }),
        );
      });

      it('passing ILearningResult should create a new form with FormGroup', () => {
        const formGroup = service.createLearningResultFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            resultCode: expect.any(Object),
            denomination: expect.any(Object),
            learningCompetence: expect.any(Object),
          }),
        );
      });
    });

    describe('getLearningResult', () => {
      it('should return NewLearningResult for default LearningResult initial value', () => {
        const formGroup = service.createLearningResultFormGroup(sampleWithNewData);

        const learningResult = service.getLearningResult(formGroup);

        expect(learningResult).toMatchObject(sampleWithNewData);
      });

      it('should return NewLearningResult for empty LearningResult initial value', () => {
        const formGroup = service.createLearningResultFormGroup();

        const learningResult = service.getLearningResult(formGroup);

        expect(learningResult).toMatchObject({});
      });

      it('should return ILearningResult', () => {
        const formGroup = service.createLearningResultFormGroup(sampleWithRequiredData);

        const learningResult = service.getLearningResult(formGroup);

        expect(learningResult).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILearningResult should not enable id FormControl', () => {
        const formGroup = service.createLearningResultFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLearningResult should disable id FormControl', () => {
        const formGroup = service.createLearningResultFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
