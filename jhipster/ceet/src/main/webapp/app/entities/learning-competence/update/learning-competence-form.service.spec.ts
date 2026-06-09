import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../learning-competence.test-samples';

import { LearningCompetenceFormService } from './learning-competence-form.service';

describe('LearningCompetence Form Service', () => {
  let service: LearningCompetenceFormService;

  beforeEach(() => {
    service = TestBed.inject(LearningCompetenceFormService);
  });

  describe('Service methods', () => {
    describe('createLearningCompetenceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLearningCompetenceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            competenceCode: expect.any(Object),
            competitionDenomination: expect.any(Object),
            trainingProgram: expect.any(Object),
          }),
        );
      });

      it('passing ILearningCompetence should create a new form with FormGroup', () => {
        const formGroup = service.createLearningCompetenceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            competenceCode: expect.any(Object),
            competitionDenomination: expect.any(Object),
            trainingProgram: expect.any(Object),
          }),
        );
      });
    });

    describe('getLearningCompetence', () => {
      it('should return NewLearningCompetence for default LearningCompetence initial value', () => {
        const formGroup = service.createLearningCompetenceFormGroup(sampleWithNewData);

        const learningCompetence = service.getLearningCompetence(formGroup);

        expect(learningCompetence).toMatchObject(sampleWithNewData);
      });

      it('should return NewLearningCompetence for empty LearningCompetence initial value', () => {
        const formGroup = service.createLearningCompetenceFormGroup();

        const learningCompetence = service.getLearningCompetence(formGroup);

        expect(learningCompetence).toMatchObject({});
      });

      it('should return ILearningCompetence', () => {
        const formGroup = service.createLearningCompetenceFormGroup(sampleWithRequiredData);

        const learningCompetence = service.getLearningCompetence(formGroup);

        expect(learningCompetence).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILearningCompetence should not enable id FormControl', () => {
        const formGroup = service.createLearningCompetenceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLearningCompetence should disable id FormControl', () => {
        const formGroup = service.createLearningCompetenceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
