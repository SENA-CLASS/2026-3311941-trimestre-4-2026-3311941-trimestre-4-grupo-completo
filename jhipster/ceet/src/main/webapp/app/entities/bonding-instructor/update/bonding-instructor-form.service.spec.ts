import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../bonding-instructor.test-samples';

import { BondingInstructorFormService } from './bonding-instructor-form.service';

describe('BondingInstructor Form Service', () => {
  let service: BondingInstructorFormService;

  beforeEach(() => {
    service = TestBed.inject(BondingInstructorFormService);
  });

  describe('Service methods', () => {
    describe('createBondingInstructorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBondingInstructorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startTime: expect.any(Object),
            endTime: expect.any(Object),
            year: expect.any(Object),
            instructor: expect.any(Object),
            bonding: expect.any(Object),
          }),
        );
      });

      it('passing IBondingInstructor should create a new form with FormGroup', () => {
        const formGroup = service.createBondingInstructorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startTime: expect.any(Object),
            endTime: expect.any(Object),
            year: expect.any(Object),
            instructor: expect.any(Object),
            bonding: expect.any(Object),
          }),
        );
      });
    });

    describe('getBondingInstructor', () => {
      it('should return NewBondingInstructor for default BondingInstructor initial value', () => {
        const formGroup = service.createBondingInstructorFormGroup(sampleWithNewData);

        const bondingInstructor = service.getBondingInstructor(formGroup);

        expect(bondingInstructor).toMatchObject(sampleWithNewData);
      });

      it('should return NewBondingInstructor for empty BondingInstructor initial value', () => {
        const formGroup = service.createBondingInstructorFormGroup();

        const bondingInstructor = service.getBondingInstructor(formGroup);

        expect(bondingInstructor).toMatchObject({});
      });

      it('should return IBondingInstructor', () => {
        const formGroup = service.createBondingInstructorFormGroup(sampleWithRequiredData);

        const bondingInstructor = service.getBondingInstructor(formGroup);

        expect(bondingInstructor).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBondingInstructor should not enable id FormControl', () => {
        const formGroup = service.createBondingInstructorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBondingInstructor should disable id FormControl', () => {
        const formGroup = service.createBondingInstructorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
