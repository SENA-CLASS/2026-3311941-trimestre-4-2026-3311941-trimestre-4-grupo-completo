import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IProjectActivity, NewProjectActivity } from '../project-activity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProjectActivity for edit and NewProjectActivityFormGroupInput for create.
 */
type ProjectActivityFormGroupInput = IProjectActivity | PartialWithRequiredKeyOf<NewProjectActivity>;

type ProjectActivityFormDefaults = Pick<NewProjectActivity, 'id'>;

type ProjectActivityFormGroupContent = {
  id: FormControl<IProjectActivity['id'] | NewProjectActivity['id']>;
  activityNumber: FormControl<IProjectActivity['activityNumber']>;
  activityDescription: FormControl<IProjectActivity['activityDescription']>;
  projectActivityState: FormControl<IProjectActivity['projectActivityState']>;
  projectPhase: FormControl<IProjectActivity['projectPhase']>;
};

export type ProjectActivityFormGroup = FormGroup<ProjectActivityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProjectActivityFormService {
  createProjectActivityFormGroup(projectActivity?: ProjectActivityFormGroupInput): ProjectActivityFormGroup {
    const projectActivityRawValue = {
      ...this.getFormDefaults(),
      ...(projectActivity ?? { id: null }),
    };
    return new FormGroup<ProjectActivityFormGroupContent>({
      id: new FormControl(
        { value: projectActivityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      activityNumber: new FormControl(projectActivityRawValue.activityNumber, {
        validators: [Validators.required],
      }),
      activityDescription: new FormControl(projectActivityRawValue.activityDescription, {
        validators: [Validators.required, Validators.maxLength(400)],
      }),
      projectActivityState: new FormControl(projectActivityRawValue.projectActivityState, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      projectPhase: new FormControl(projectActivityRawValue.projectPhase, {
        validators: [Validators.required],
      }),
    });
  }

  getProjectActivity(form: ProjectActivityFormGroup): IProjectActivity | NewProjectActivity {
    return form.getRawValue();
  }

  resetForm(form: ProjectActivityFormGroup, projectActivity: ProjectActivityFormGroupInput): void {
    const projectActivityRawValue = { ...this.getFormDefaults(), ...projectActivity };
    form.reset({
      ...projectActivityRawValue,
      id: { value: projectActivityRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ProjectActivityFormDefaults {
    return {
      id: null,
    };
  }
}
