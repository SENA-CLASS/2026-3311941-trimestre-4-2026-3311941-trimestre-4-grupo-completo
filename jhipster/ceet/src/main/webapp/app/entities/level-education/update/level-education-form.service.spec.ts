import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../level-education.test-samples';

import { LevelEducationFormService } from './level-education-form.service';

describe('LevelEducation Form Service', () => {
  let service: LevelEducationFormService;

  beforeEach(() => {
    service = TestBed.inject(LevelEducationFormService);
  });

  describe('Service methods', () => {
    describe('createLevelEducationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLevelEducationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            levelName: expect.any(Object),
            stateLevelEducation: expect.any(Object),
          }),
        );
      });

      it('passing ILevelEducation should create a new form with FormGroup', () => {
        const formGroup = service.createLevelEducationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            levelName: expect.any(Object),
            stateLevelEducation: expect.any(Object),
          }),
        );
      });
    });

    describe('getLevelEducation', () => {
      it('should return NewLevelEducation for default LevelEducation initial value', () => {
        const formGroup = service.createLevelEducationFormGroup(sampleWithNewData);

        const levelEducation = service.getLevelEducation(formGroup);

        expect(levelEducation).toMatchObject(sampleWithNewData);
      });

      it('should return NewLevelEducation for empty LevelEducation initial value', () => {
        const formGroup = service.createLevelEducationFormGroup();

        const levelEducation = service.getLevelEducation(formGroup);

        expect(levelEducation).toMatchObject({});
      });

      it('should return ILevelEducation', () => {
        const formGroup = service.createLevelEducationFormGroup(sampleWithRequiredData);

        const levelEducation = service.getLevelEducation(formGroup);

        expect(levelEducation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILevelEducation should not enable id FormControl', () => {
        const formGroup = service.createLevelEducationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLevelEducation should disable id FormControl', () => {
        const formGroup = service.createLevelEducationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
