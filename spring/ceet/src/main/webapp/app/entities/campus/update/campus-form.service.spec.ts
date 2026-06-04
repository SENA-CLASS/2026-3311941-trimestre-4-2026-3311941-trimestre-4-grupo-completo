import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../campus.test-samples';

import { CampusFormService } from './campus-form.service';

describe('Campus Form Service', () => {
  let service: CampusFormService;

  beforeEach(() => {
    service = TestBed.inject(CampusFormService);
  });

  describe('Service methods', () => {
    describe('createCampusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCampusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            campusName: expect.any(Object),
            campusAddress: expect.any(Object),
            campusState: expect.any(Object),
          }),
        );
      });

      it('passing ICampus should create a new form with FormGroup', () => {
        const formGroup = service.createCampusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            campusName: expect.any(Object),
            campusAddress: expect.any(Object),
            campusState: expect.any(Object),
          }),
        );
      });
    });

    describe('getCampus', () => {
      it('should return NewCampus for default Campus initial value', () => {
        const formGroup = service.createCampusFormGroup(sampleWithNewData);

        const campus = service.getCampus(formGroup);

        expect(campus).toMatchObject(sampleWithNewData);
      });

      it('should return NewCampus for empty Campus initial value', () => {
        const formGroup = service.createCampusFormGroup();

        const campus = service.getCampus(formGroup);

        expect(campus).toMatchObject({});
      });

      it('should return ICampus', () => {
        const formGroup = service.createCampusFormGroup(sampleWithRequiredData);

        const campus = service.getCampus(formGroup);

        expect(campus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICampus should not enable id FormControl', () => {
        const formGroup = service.createCampusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCampus should disable id FormControl', () => {
        const formGroup = service.createCampusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
