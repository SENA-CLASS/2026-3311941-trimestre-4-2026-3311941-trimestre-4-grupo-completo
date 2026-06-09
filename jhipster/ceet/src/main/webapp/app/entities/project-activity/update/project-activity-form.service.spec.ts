import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../project-activity.test-samples';

import { ProjectActivityFormService } from './project-activity-form.service';

describe('ProjectActivity Form Service', () => {
  let service: ProjectActivityFormService;

  beforeEach(() => {
    service = TestBed.inject(ProjectActivityFormService);
  });

  describe('Service methods', () => {
    describe('createProjectActivityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProjectActivityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activityNumber: expect.any(Object),
            activityDescription: expect.any(Object),
            projectActivityState: expect.any(Object),
            projectPhase: expect.any(Object),
          }),
        );
      });

      it('passing IProjectActivity should create a new form with FormGroup', () => {
        const formGroup = service.createProjectActivityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activityNumber: expect.any(Object),
            activityDescription: expect.any(Object),
            projectActivityState: expect.any(Object),
            projectPhase: expect.any(Object),
          }),
        );
      });
    });

    describe('getProjectActivity', () => {
      it('should return NewProjectActivity for default ProjectActivity initial value', () => {
        const formGroup = service.createProjectActivityFormGroup(sampleWithNewData);

        const projectActivity = service.getProjectActivity(formGroup);

        expect(projectActivity).toMatchObject(sampleWithNewData);
      });

      it('should return NewProjectActivity for empty ProjectActivity initial value', () => {
        const formGroup = service.createProjectActivityFormGroup();

        const projectActivity = service.getProjectActivity(formGroup);

        expect(projectActivity).toMatchObject({});
      });

      it('should return IProjectActivity', () => {
        const formGroup = service.createProjectActivityFormGroup(sampleWithRequiredData);

        const projectActivity = service.getProjectActivity(formGroup);

        expect(projectActivity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProjectActivity should not enable id FormControl', () => {
        const formGroup = service.createProjectActivityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProjectActivity should disable id FormControl', () => {
        const formGroup = service.createProjectActivityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
