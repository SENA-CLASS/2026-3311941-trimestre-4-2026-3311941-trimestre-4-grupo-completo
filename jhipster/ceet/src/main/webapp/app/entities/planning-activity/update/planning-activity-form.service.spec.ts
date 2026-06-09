import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../planning-activity.test-samples';

import { PlanningActivityFormService } from './planning-activity-form.service';

describe('PlanningActivity Form Service', () => {
  let service: PlanningActivityFormService;

  beforeEach(() => {
    service = TestBed.inject(PlanningActivityFormService);
  });

  describe('Service methods', () => {
    describe('createPlanningActivityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPlanningActivityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quarterSchedule: expect.any(Object),
            projectActivity: expect.any(Object),
          }),
        );
      });

      it('passing IPlanningActivity should create a new form with FormGroup', () => {
        const formGroup = service.createPlanningActivityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quarterSchedule: expect.any(Object),
            projectActivity: expect.any(Object),
          }),
        );
      });
    });

    describe('getPlanningActivity', () => {
      it('should return NewPlanningActivity for default PlanningActivity initial value', () => {
        const formGroup = service.createPlanningActivityFormGroup(sampleWithNewData);

        const planningActivity = service.getPlanningActivity(formGroup);

        expect(planningActivity).toMatchObject(sampleWithNewData);
      });

      it('should return NewPlanningActivity for empty PlanningActivity initial value', () => {
        const formGroup = service.createPlanningActivityFormGroup();

        const planningActivity = service.getPlanningActivity(formGroup);

        expect(planningActivity).toMatchObject({});
      });

      it('should return IPlanningActivity', () => {
        const formGroup = service.createPlanningActivityFormGroup(sampleWithRequiredData);

        const planningActivity = service.getPlanningActivity(formGroup);

        expect(planningActivity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPlanningActivity should not enable id FormControl', () => {
        const formGroup = service.createPlanningActivityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPlanningActivity should disable id FormControl', () => {
        const formGroup = service.createPlanningActivityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
