import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../check-list-course.test-samples';

import { CheckListCourseFormService } from './check-list-course-form.service';

describe('CheckListCourse Form Service', () => {
  let service: CheckListCourseFormService;

  beforeEach(() => {
    service = TestBed.inject(CheckListCourseFormService);
  });

  describe('Service methods', () => {
    describe('createCheckListCourseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCheckListCourseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            checkListState: expect.any(Object),
            course: expect.any(Object),
            checkList: expect.any(Object),
          }),
        );
      });

      it('passing ICheckListCourse should create a new form with FormGroup', () => {
        const formGroup = service.createCheckListCourseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            checkListState: expect.any(Object),
            course: expect.any(Object),
            checkList: expect.any(Object),
          }),
        );
      });
    });

    describe('getCheckListCourse', () => {
      it('should return NewCheckListCourse for default CheckListCourse initial value', () => {
        const formGroup = service.createCheckListCourseFormGroup(sampleWithNewData);

        const checkListCourse = service.getCheckListCourse(formGroup);

        expect(checkListCourse).toMatchObject(sampleWithNewData);
      });

      it('should return NewCheckListCourse for empty CheckListCourse initial value', () => {
        const formGroup = service.createCheckListCourseFormGroup();

        const checkListCourse = service.getCheckListCourse(formGroup);

        expect(checkListCourse).toMatchObject({});
      });

      it('should return ICheckListCourse', () => {
        const formGroup = service.createCheckListCourseFormGroup(sampleWithRequiredData);

        const checkListCourse = service.getCheckListCourse(formGroup);

        expect(checkListCourse).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICheckListCourse should not enable id FormControl', () => {
        const formGroup = service.createCheckListCourseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCheckListCourse should disable id FormControl', () => {
        const formGroup = service.createCheckListCourseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
