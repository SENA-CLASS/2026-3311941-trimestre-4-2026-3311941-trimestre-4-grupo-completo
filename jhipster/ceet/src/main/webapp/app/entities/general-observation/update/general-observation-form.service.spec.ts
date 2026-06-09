import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../general-observation.test-samples';

import { GeneralObservationFormService } from './general-observation-form.service';

describe('GeneralObservation Form Service', () => {
  let service: GeneralObservationFormService;

  beforeEach(() => {
    service = TestBed.inject(GeneralObservationFormService);
  });

  describe('Service methods', () => {
    describe('createGeneralObservationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGeneralObservationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            number: expect.any(Object),
            observationGeneral: expect.any(Object),
            jury: expect.any(Object),
            dateAudit: expect.any(Object),
            projectGroup: expect.any(Object),
            customer: expect.any(Object),
          }),
        );
      });

      it('passing IGeneralObservation should create a new form with FormGroup', () => {
        const formGroup = service.createGeneralObservationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            number: expect.any(Object),
            observationGeneral: expect.any(Object),
            jury: expect.any(Object),
            dateAudit: expect.any(Object),
            projectGroup: expect.any(Object),
            customer: expect.any(Object),
          }),
        );
      });
    });

    describe('getGeneralObservation', () => {
      it('should return NewGeneralObservation for default GeneralObservation initial value', () => {
        const formGroup = service.createGeneralObservationFormGroup(sampleWithNewData);

        const generalObservation = service.getGeneralObservation(formGroup);

        expect(generalObservation).toMatchObject(sampleWithNewData);
      });

      it('should return NewGeneralObservation for empty GeneralObservation initial value', () => {
        const formGroup = service.createGeneralObservationFormGroup();

        const generalObservation = service.getGeneralObservation(formGroup);

        expect(generalObservation).toMatchObject({});
      });

      it('should return IGeneralObservation', () => {
        const formGroup = service.createGeneralObservationFormGroup(sampleWithRequiredData);

        const generalObservation = service.getGeneralObservation(formGroup);

        expect(generalObservation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGeneralObservation should not enable id FormControl', () => {
        const formGroup = service.createGeneralObservationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGeneralObservation should disable id FormControl', () => {
        const formGroup = service.createGeneralObservationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
