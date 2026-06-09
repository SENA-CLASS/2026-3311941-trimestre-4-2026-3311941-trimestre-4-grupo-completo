import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../training-status.test-samples';

import { TrainingStatusFormService } from './training-status-form.service';

describe('TrainingStatus Form Service', () => {
  let service: TrainingStatusFormService;

  beforeEach(() => {
    service = TestBed.inject(TrainingStatusFormService);
  });

  describe('Service methods', () => {
    describe('createTrainingStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTrainingStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            statusName: expect.any(Object),
            stateTraining: expect.any(Object),
          }),
        );
      });

      it('passing ITrainingStatus should create a new form with FormGroup', () => {
        const formGroup = service.createTrainingStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            statusName: expect.any(Object),
            stateTraining: expect.any(Object),
          }),
        );
      });
    });

    describe('getTrainingStatus', () => {
      it('should return NewTrainingStatus for default TrainingStatus initial value', () => {
        const formGroup = service.createTrainingStatusFormGroup(sampleWithNewData);

        const trainingStatus = service.getTrainingStatus(formGroup);

        expect(trainingStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewTrainingStatus for empty TrainingStatus initial value', () => {
        const formGroup = service.createTrainingStatusFormGroup();

        const trainingStatus = service.getTrainingStatus(formGroup);

        expect(trainingStatus).toMatchObject({});
      });

      it('should return ITrainingStatus', () => {
        const formGroup = service.createTrainingStatusFormGroup(sampleWithRequiredData);

        const trainingStatus = service.getTrainingStatus(formGroup);

        expect(trainingStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITrainingStatus should not enable id FormControl', () => {
        const formGroup = service.createTrainingStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTrainingStatus should disable id FormControl', () => {
        const formGroup = service.createTrainingStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
