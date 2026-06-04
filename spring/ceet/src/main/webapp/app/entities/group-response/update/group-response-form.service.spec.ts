import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../group-response.test-samples';

import { GroupResponseFormService } from './group-response-form.service';

describe('GroupResponse Form Service', () => {
  let service: GroupResponseFormService;

  beforeEach(() => {
    service = TestBed.inject(GroupResponseFormService);
  });

  describe('Service methods', () => {
    describe('createGroupResponseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGroupResponseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            evaluationDate: expect.any(Object),
            projectGroup: expect.any(Object),
            assessment: expect.any(Object),
            itemList: expect.any(Object),
          }),
        );
      });

      it('passing IGroupResponse should create a new form with FormGroup', () => {
        const formGroup = service.createGroupResponseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            evaluationDate: expect.any(Object),
            projectGroup: expect.any(Object),
            assessment: expect.any(Object),
            itemList: expect.any(Object),
          }),
        );
      });
    });

    describe('getGroupResponse', () => {
      it('should return NewGroupResponse for default GroupResponse initial value', () => {
        const formGroup = service.createGroupResponseFormGroup(sampleWithNewData);

        const groupResponse = service.getGroupResponse(formGroup);

        expect(groupResponse).toMatchObject(sampleWithNewData);
      });

      it('should return NewGroupResponse for empty GroupResponse initial value', () => {
        const formGroup = service.createGroupResponseFormGroup();

        const groupResponse = service.getGroupResponse(formGroup);

        expect(groupResponse).toMatchObject({});
      });

      it('should return IGroupResponse', () => {
        const formGroup = service.createGroupResponseFormGroup(sampleWithRequiredData);

        const groupResponse = service.getGroupResponse(formGroup);

        expect(groupResponse).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGroupResponse should not enable id FormControl', () => {
        const formGroup = service.createGroupResponseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGroupResponse should disable id FormControl', () => {
        const formGroup = service.createGroupResponseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
