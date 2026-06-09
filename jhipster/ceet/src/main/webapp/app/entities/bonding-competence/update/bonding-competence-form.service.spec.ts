import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../bonding-competence.test-samples';

import { BondingCompetenceFormService } from './bonding-competence-form.service';

describe('BondingCompetence Form Service', () => {
  let service: BondingCompetenceFormService;

  beforeEach(() => {
    service = TestBed.inject(BondingCompetenceFormService);
  });

  describe('Service methods', () => {
    describe('createBondingCompetenceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBondingCompetenceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bondingInstructor: expect.any(Object),
            learningCompetence: expect.any(Object),
          }),
        );
      });

      it('passing IBondingCompetence should create a new form with FormGroup', () => {
        const formGroup = service.createBondingCompetenceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bondingInstructor: expect.any(Object),
            learningCompetence: expect.any(Object),
          }),
        );
      });
    });

    describe('getBondingCompetence', () => {
      it('should return NewBondingCompetence for default BondingCompetence initial value', () => {
        const formGroup = service.createBondingCompetenceFormGroup(sampleWithNewData);

        const bondingCompetence = service.getBondingCompetence(formGroup);

        expect(bondingCompetence).toMatchObject(sampleWithNewData);
      });

      it('should return NewBondingCompetence for empty BondingCompetence initial value', () => {
        const formGroup = service.createBondingCompetenceFormGroup();

        const bondingCompetence = service.getBondingCompetence(formGroup);

        expect(bondingCompetence).toMatchObject({});
      });

      it('should return IBondingCompetence', () => {
        const formGroup = service.createBondingCompetenceFormGroup(sampleWithRequiredData);

        const bondingCompetence = service.getBondingCompetence(formGroup);

        expect(bondingCompetence).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBondingCompetence should not enable id FormControl', () => {
        const formGroup = service.createBondingCompetenceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBondingCompetence should disable id FormControl', () => {
        const formGroup = service.createBondingCompetenceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
