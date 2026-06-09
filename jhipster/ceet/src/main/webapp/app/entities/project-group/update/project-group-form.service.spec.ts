import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../project-group.test-samples';

import { ProjectGroupFormService } from './project-group-form.service';

describe('ProjectGroup Form Service', () => {
  let service: ProjectGroupFormService;

  beforeEach(() => {
    service = TestBed.inject(ProjectGroupFormService);
  });

  describe('Service methods', () => {
    describe('createProjectGroupFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProjectGroupFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            groupNumber: expect.any(Object),
            projectName: expect.any(Object),
            projectGroupState: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });

      it('passing IProjectGroup should create a new form with FormGroup', () => {
        const formGroup = service.createProjectGroupFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            groupNumber: expect.any(Object),
            projectName: expect.any(Object),
            projectGroupState: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });
    });

    describe('getProjectGroup', () => {
      it('should return NewProjectGroup for default ProjectGroup initial value', () => {
        const formGroup = service.createProjectGroupFormGroup(sampleWithNewData);

        const projectGroup = service.getProjectGroup(formGroup);

        expect(projectGroup).toMatchObject(sampleWithNewData);
      });

      it('should return NewProjectGroup for empty ProjectGroup initial value', () => {
        const formGroup = service.createProjectGroupFormGroup();

        const projectGroup = service.getProjectGroup(formGroup);

        expect(projectGroup).toMatchObject({});
      });

      it('should return IProjectGroup', () => {
        const formGroup = service.createProjectGroupFormGroup(sampleWithRequiredData);

        const projectGroup = service.getProjectGroup(formGroup);

        expect(projectGroup).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProjectGroup should not enable id FormControl', () => {
        const formGroup = service.createProjectGroupFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProjectGroup should disable id FormControl', () => {
        const formGroup = service.createProjectGroupFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
