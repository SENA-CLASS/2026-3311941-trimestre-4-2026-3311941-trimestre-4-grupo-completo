import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../viewed-result.test-samples';

import { ViewedResultFormService } from './viewed-result-form.service';

describe('ViewedResult Form Service', () => {
  let service: ViewedResultFormService;

  beforeEach(() => {
    service = TestBed.inject(ViewedResultFormService);
  });

  describe('Service methods', () => {
    describe('createViewedResultFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createViewedResultFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            courseTrimester: expect.any(Object),
            planning: expect.any(Object),
            learningResult: expect.any(Object),
          }),
        );
      });

      it('passing IViewedResult should create a new form with FormGroup', () => {
        const formGroup = service.createViewedResultFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            courseTrimester: expect.any(Object),
            planning: expect.any(Object),
            learningResult: expect.any(Object),
          }),
        );
      });
    });

    describe('getViewedResult', () => {
      it('should return NewViewedResult for default ViewedResult initial value', () => {
        const formGroup = service.createViewedResultFormGroup(sampleWithNewData);

        const viewedResult = service.getViewedResult(formGroup);

        expect(viewedResult).toMatchObject(sampleWithNewData);
      });

      it('should return NewViewedResult for empty ViewedResult initial value', () => {
        const formGroup = service.createViewedResultFormGroup();

        const viewedResult = service.getViewedResult(formGroup);

        expect(viewedResult).toMatchObject({});
      });

      it('should return IViewedResult', () => {
        const formGroup = service.createViewedResultFormGroup(sampleWithRequiredData);

        const viewedResult = service.getViewedResult(formGroup);

        expect(viewedResult).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IViewedResult should not enable id FormControl', () => {
        const formGroup = service.createViewedResultFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewViewedResult should disable id FormControl', () => {
        const formGroup = service.createViewedResultFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
