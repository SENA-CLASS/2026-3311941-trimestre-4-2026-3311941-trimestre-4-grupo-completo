import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IProjectPhase, NewProjectPhase } from '../project-phase.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProjectPhase for edit and NewProjectPhaseFormGroupInput for create.
 */
type ProjectPhaseFormGroupInput = IProjectPhase | PartialWithRequiredKeyOf<NewProjectPhase>;

type ProjectPhaseFormDefaults = Pick<NewProjectPhase, 'id'>;

type ProjectPhaseFormGroupContent = {
  id: FormControl<IProjectPhase['id'] | NewProjectPhase['id']>;
  projectPhaseCode: FormControl<IProjectPhase['projectPhaseCode']>;
  projectPhaseState: FormControl<IProjectPhase['projectPhaseState']>;
  project: FormControl<IProjectPhase['project']>;
};

export type ProjectPhaseFormGroup = FormGroup<ProjectPhaseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProjectPhaseFormService {
  createProjectPhaseFormGroup(projectPhase?: ProjectPhaseFormGroupInput): ProjectPhaseFormGroup {
    const projectPhaseRawValue = {
      ...this.getFormDefaults(),
      ...(projectPhase ?? { id: null }),
    };
    return new FormGroup<ProjectPhaseFormGroupContent>({
      id: new FormControl(
        { value: projectPhaseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      projectPhaseCode: new FormControl(projectPhaseRawValue.projectPhaseCode, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      projectPhaseState: new FormControl(projectPhaseRawValue.projectPhaseState, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      project: new FormControl(projectPhaseRawValue.project, {
        validators: [Validators.required],
      }),
    });
  }

  getProjectPhase(form: ProjectPhaseFormGroup): IProjectPhase | NewProjectPhase {
    return form.getRawValue() as IProjectPhase | NewProjectPhase;
  }

  resetForm(form: ProjectPhaseFormGroup, projectPhase: ProjectPhaseFormGroupInput): void {
    const projectPhaseRawValue = { ...this.getFormDefaults(), ...projectPhase };
    form.reset({
      ...projectPhaseRawValue,
      id: { value: projectPhaseRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ProjectPhaseFormDefaults {
    return {
      id: null,
    };
  }
}
