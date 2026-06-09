import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IProjectGroup, NewProjectGroup } from '../project-group.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProjectGroup for edit and NewProjectGroupFormGroupInput for create.
 */
type ProjectGroupFormGroupInput = IProjectGroup | PartialWithRequiredKeyOf<NewProjectGroup>;

type ProjectGroupFormDefaults = Pick<NewProjectGroup, 'id'>;

type ProjectGroupFormGroupContent = {
  id: FormControl<IProjectGroup['id'] | NewProjectGroup['id']>;
  groupNumber: FormControl<IProjectGroup['groupNumber']>;
  projectName: FormControl<IProjectGroup['projectName']>;
  projectGroupState: FormControl<IProjectGroup['projectGroupState']>;
  course: FormControl<IProjectGroup['course']>;
};

export type ProjectGroupFormGroup = FormGroup<ProjectGroupFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProjectGroupFormService {
  createProjectGroupFormGroup(projectGroup?: ProjectGroupFormGroupInput): ProjectGroupFormGroup {
    const projectGroupRawValue = {
      ...this.getFormDefaults(),
      ...(projectGroup ?? { id: null }),
    };
    return new FormGroup<ProjectGroupFormGroupContent>({
      id: new FormControl(
        { value: projectGroupRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      groupNumber: new FormControl(projectGroupRawValue.groupNumber, {
        validators: [Validators.required],
      }),
      projectName: new FormControl(projectGroupRawValue.projectName, {
        validators: [Validators.required, Validators.maxLength(300)],
      }),
      projectGroupState: new FormControl(projectGroupRawValue.projectGroupState, {
        validators: [Validators.required],
      }),
      course: new FormControl(projectGroupRawValue.course, {
        validators: [Validators.required],
      }),
    });
  }

  getProjectGroup(form: ProjectGroupFormGroup): IProjectGroup | NewProjectGroup {
    return form.getRawValue();
  }

  resetForm(form: ProjectGroupFormGroup, projectGroup: ProjectGroupFormGroupInput): void {
    const projectGroupRawValue = { ...this.getFormDefaults(), ...projectGroup };
    form.reset({
      ...projectGroupRawValue,
      id: { value: projectGroupRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ProjectGroupFormDefaults {
    return {
      id: null,
    };
  }
}
