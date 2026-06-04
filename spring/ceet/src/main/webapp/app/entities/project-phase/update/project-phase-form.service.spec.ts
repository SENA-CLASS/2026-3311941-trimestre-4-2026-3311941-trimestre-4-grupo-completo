import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../project-phase.test-samples';

import { ProjectPhaseFormService } from './project-phase-form.service';

describe('ProjectPhase Form Service', () => {
  let service: ProjectPhaseFormService;

  beforeEach(() => {
    service = TestBed.inject(ProjectPhaseFormService);
  });

  describe('Service methods', () => {
    describe('createProjectPhaseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProjectPhaseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            projectPhaseCode: expect.any(Object),
            projectPhaseState: expect.any(Object),
            project: expect.any(Object),
          }),
        );
      });

      it('passing IProjectPhase should create a new form with FormGroup', () => {
        const formGroup = service.createProjectPhaseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            projectPhaseCode: expect.any(Object),
            projectPhaseState: expect.any(Object),
            project: expect.any(Object),
          }),
        );
      });
    });

    describe('getProjectPhase', () => {
      it('should return NewProjectPhase for default ProjectPhase initial value', () => {
        const formGroup = service.createProjectPhaseFormGroup(sampleWithNewData);

        const projectPhase = service.getProjectPhase(formGroup);

        expect(projectPhase).toMatchObject(sampleWithNewData);
      });

      it('should return NewProjectPhase for empty ProjectPhase initial value', () => {
        const formGroup = service.createProjectPhaseFormGroup();

        const projectPhase = service.getProjectPhase(formGroup);

        expect(projectPhase).toMatchObject({});
      });

      it('should return IProjectPhase', () => {
        const formGroup = service.createProjectPhaseFormGroup(sampleWithRequiredData);

        const projectPhase = service.getProjectPhase(formGroup);

        expect(projectPhase).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProjectPhase should not enable id FormControl', () => {
        const formGroup = service.createProjectPhaseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProjectPhase should disable id FormControl', () => {
        const formGroup = service.createProjectPhaseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
