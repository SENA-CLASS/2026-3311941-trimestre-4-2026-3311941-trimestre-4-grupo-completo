import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../planning.test-samples';

import { PlanningFormService } from './planning-form.service';

describe('Planning Form Service', () => {
  let service: PlanningFormService;

  beforeEach(() => {
    service = TestBed.inject(PlanningFormService);
  });

  describe('Service methods', () => {
    describe('createPlanningFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPlanningFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            planningCode: expect.any(Object),
            planningDate: expect.any(Object),
            planningState: expect.any(Object),
          }),
        );
      });

      it('passing IPlanning should create a new form with FormGroup', () => {
        const formGroup = service.createPlanningFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            planningCode: expect.any(Object),
            planningDate: expect.any(Object),
            planningState: expect.any(Object),
          }),
        );
      });
    });

    describe('getPlanning', () => {
      it('should return NewPlanning for default Planning initial value', () => {
        const formGroup = service.createPlanningFormGroup(sampleWithNewData);

        const planning = service.getPlanning(formGroup);

        expect(planning).toMatchObject(sampleWithNewData);
      });

      it('should return NewPlanning for empty Planning initial value', () => {
        const formGroup = service.createPlanningFormGroup();

        const planning = service.getPlanning(formGroup);

        expect(planning).toMatchObject({});
      });

      it('should return IPlanning', () => {
        const formGroup = service.createPlanningFormGroup(sampleWithRequiredData);

        const planning = service.getPlanning(formGroup);

        expect(planning).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPlanning should not enable id FormControl', () => {
        const formGroup = service.createPlanningFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPlanning should disable id FormControl', () => {
        const formGroup = service.createPlanningFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
