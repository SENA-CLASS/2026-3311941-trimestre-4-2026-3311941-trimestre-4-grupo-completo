import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IProject, NewProject } from '../project.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProject for edit and NewProjectFormGroupInput for create.
 */
type ProjectFormGroupInput = IProject | PartialWithRequiredKeyOf<NewProject>;

type ProjectFormDefaults = Pick<NewProject, 'id'>;

type ProjectFormGroupContent = {
  id: FormControl<IProject['id'] | NewProject['id']>;
  projectCode: FormControl<IProject['projectCode']>;
  projectName: FormControl<IProject['projectName']>;
  projectState: FormControl<IProject['projectState']>;
  trainingProgram: FormControl<IProject['trainingProgram']>;
};

export type ProjectFormGroup = FormGroup<ProjectFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProjectFormService {
  createProjectFormGroup(project?: ProjectFormGroupInput): ProjectFormGroup {
    const projectRawValue = {
      ...this.getFormDefaults(),
      ...(project ?? { id: null }),
    };
    return new FormGroup<ProjectFormGroupContent>({
      id: new FormControl(
        { value: projectRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      projectCode: new FormControl(projectRawValue.projectCode, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      projectName: new FormControl(projectRawValue.projectName, {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      projectState: new FormControl(projectRawValue.projectState, {
        validators: [Validators.required],
      }),
      trainingProgram: new FormControl(projectRawValue.trainingProgram, {
        validators: [Validators.required],
      }),
    });
  }

  getProject(form: ProjectFormGroup): IProject | NewProject {
    return form.getRawValue();
  }

  resetForm(form: ProjectFormGroup, project: ProjectFormGroupInput): void {
    const projectRawValue = { ...this.getFormDefaults(), ...project };
    form.reset({
      ...projectRawValue,
      id: { value: projectRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ProjectFormDefaults {
    return {
      id: null,
    };
  }
}
