import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../classroom-type.test-samples';

import { ClassroomTypeFormService } from './classroom-type-form.service';

describe('ClassroomType Form Service', () => {
  let service: ClassroomTypeFormService;

  beforeEach(() => {
    service = TestBed.inject(ClassroomTypeFormService);
  });

  describe('Service methods', () => {
    describe('createClassroomTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createClassroomTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            typeClassroom: expect.any(Object),
            classroomDescription: expect.any(Object),
            classroomState: expect.any(Object),
          }),
        );
      });

      it('passing IClassroomType should create a new form with FormGroup', () => {
        const formGroup = service.createClassroomTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            typeClassroom: expect.any(Object),
            classroomDescription: expect.any(Object),
            classroomState: expect.any(Object),
          }),
        );
      });
    });

    describe('getClassroomType', () => {
      it('should return NewClassroomType for default ClassroomType initial value', () => {
        const formGroup = service.createClassroomTypeFormGroup(sampleWithNewData);

        const classroomType = service.getClassroomType(formGroup);

        expect(classroomType).toMatchObject(sampleWithNewData);
      });

      it('should return NewClassroomType for empty ClassroomType initial value', () => {
        const formGroup = service.createClassroomTypeFormGroup();

        const classroomType = service.getClassroomType(formGroup);

        expect(classroomType).toMatchObject({});
      });

      it('should return IClassroomType', () => {
        const formGroup = service.createClassroomTypeFormGroup(sampleWithRequiredData);

        const classroomType = service.getClassroomType(formGroup);

        expect(classroomType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IClassroomType should not enable id FormControl', () => {
        const formGroup = service.createClassroomTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewClassroomType should disable id FormControl', () => {
        const formGroup = service.createClassroomTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
