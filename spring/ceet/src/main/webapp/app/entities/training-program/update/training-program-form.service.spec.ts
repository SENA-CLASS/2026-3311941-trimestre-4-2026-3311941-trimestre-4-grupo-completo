import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../training-program.test-samples';

import { TrainingProgramFormService } from './training-program-form.service';

describe('TrainingProgram Form Service', () => {
  let service: TrainingProgramFormService;

  beforeEach(() => {
    service = TestBed.inject(TrainingProgramFormService);
  });

  describe('Service methods', () => {
    describe('createTrainingProgramFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTrainingProgramFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            programCode: expect.any(Object),
            programVersion: expect.any(Object),
            programName: expect.any(Object),
            programInitials: expect.any(Object),
            programState: expect.any(Object),
            levelEducation: expect.any(Object),
          }),
        );
      });

      it('passing ITrainingProgram should create a new form with FormGroup', () => {
        const formGroup = service.createTrainingProgramFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            programCode: expect.any(Object),
            programVersion: expect.any(Object),
            programName: expect.any(Object),
            programInitials: expect.any(Object),
            programState: expect.any(Object),
            levelEducation: expect.any(Object),
          }),
        );
      });
    });

    describe('getTrainingProgram', () => {
      it('should return NewTrainingProgram for default TrainingProgram initial value', () => {
        const formGroup = service.createTrainingProgramFormGroup(sampleWithNewData);

        const trainingProgram = service.getTrainingProgram(formGroup);

        expect(trainingProgram).toMatchObject(sampleWithNewData);
      });

      it('should return NewTrainingProgram for empty TrainingProgram initial value', () => {
        const formGroup = service.createTrainingProgramFormGroup();

        const trainingProgram = service.getTrainingProgram(formGroup);

        expect(trainingProgram).toMatchObject({});
      });

      it('should return ITrainingProgram', () => {
        const formGroup = service.createTrainingProgramFormGroup(sampleWithRequiredData);

        const trainingProgram = service.getTrainingProgram(formGroup);

        expect(trainingProgram).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITrainingProgram should not enable id FormControl', () => {
        const formGroup = service.createTrainingProgramFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTrainingProgram should disable id FormControl', () => {
        const formGroup = service.createTrainingProgramFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
