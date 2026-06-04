import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../bonding.test-samples';

import { BondingFormService } from './bonding-form.service';

describe('Bonding Form Service', () => {
  let service: BondingFormService;

  beforeEach(() => {
    service = TestBed.inject(BondingFormService);
  });

  describe('Service methods', () => {
    describe('createBondingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBondingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bondingType: expect.any(Object),
            workingHours: expect.any(Object),
            bondingState: expect.any(Object),
          }),
        );
      });

      it('passing IBonding should create a new form with FormGroup', () => {
        const formGroup = service.createBondingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bondingType: expect.any(Object),
            workingHours: expect.any(Object),
            bondingState: expect.any(Object),
          }),
        );
      });
    });

    describe('getBonding', () => {
      it('should return NewBonding for default Bonding initial value', () => {
        const formGroup = service.createBondingFormGroup(sampleWithNewData);

        const bonding = service.getBonding(formGroup);

        expect(bonding).toMatchObject(sampleWithNewData);
      });

      it('should return NewBonding for empty Bonding initial value', () => {
        const formGroup = service.createBondingFormGroup();

        const bonding = service.getBonding(formGroup);

        expect(bonding).toMatchObject({});
      });

      it('should return IBonding', () => {
        const formGroup = service.createBondingFormGroup(sampleWithRequiredData);

        const bonding = service.getBonding(formGroup);

        expect(bonding).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBonding should not enable id FormControl', () => {
        const formGroup = service.createBondingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBonding should disable id FormControl', () => {
        const formGroup = service.createBondingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
