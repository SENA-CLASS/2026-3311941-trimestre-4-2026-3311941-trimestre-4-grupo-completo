import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../observation-response.test-samples';

import { ObservationResponseFormService } from './observation-response-form.service';

describe('ObservationResponse Form Service', () => {
  let service: ObservationResponseFormService;

  beforeEach(() => {
    service = TestBed.inject(ObservationResponseFormService);
  });

  describe('Service methods', () => {
    describe('createObservationResponseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createObservationResponseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            numberObservation: expect.any(Object),
            obsevation: expect.any(Object),
            juries: expect.any(Object),
            dateObservation: expect.any(Object),
            groupResponse: expect.any(Object),
            customer: expect.any(Object),
          }),
        );
      });

      it('passing IObservationResponse should create a new form with FormGroup', () => {
        const formGroup = service.createObservationResponseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            numberObservation: expect.any(Object),
            obsevation: expect.any(Object),
            juries: expect.any(Object),
            dateObservation: expect.any(Object),
            groupResponse: expect.any(Object),
            customer: expect.any(Object),
          }),
        );
      });
    });

    describe('getObservationResponse', () => {
      it('should return NewObservationResponse for default ObservationResponse initial value', () => {
        const formGroup = service.createObservationResponseFormGroup(sampleWithNewData);

        const observationResponse = service.getObservationResponse(formGroup);

        expect(observationResponse).toMatchObject(sampleWithNewData);
      });

      it('should return NewObservationResponse for empty ObservationResponse initial value', () => {
        const formGroup = service.createObservationResponseFormGroup();

        const observationResponse = service.getObservationResponse(formGroup);

        expect(observationResponse).toMatchObject({});
      });

      it('should return IObservationResponse', () => {
        const formGroup = service.createObservationResponseFormGroup(sampleWithRequiredData);

        const observationResponse = service.getObservationResponse(formGroup);

        expect(observationResponse).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IObservationResponse should not enable id FormControl', () => {
        const formGroup = service.createObservationResponseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewObservationResponse should disable id FormControl', () => {
        const formGroup = service.createObservationResponseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
