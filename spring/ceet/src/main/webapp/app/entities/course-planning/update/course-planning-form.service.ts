import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICoursePlanning, NewCoursePlanning } from '../course-planning.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICoursePlanning for edit and NewCoursePlanningFormGroupInput for create.
 */
type CoursePlanningFormGroupInput = ICoursePlanning | PartialWithRequiredKeyOf<NewCoursePlanning>;

type CoursePlanningFormDefaults = Pick<NewCoursePlanning, 'id'>;

type CoursePlanningFormGroupContent = {
  id: FormControl<ICoursePlanning['id'] | NewCoursePlanning['id']>;
  stateCoursePlanning: FormControl<ICoursePlanning['stateCoursePlanning']>;
  course: FormControl<ICoursePlanning['course']>;
  planning: FormControl<ICoursePlanning['planning']>;
};

export type CoursePlanningFormGroup = FormGroup<CoursePlanningFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CoursePlanningFormService {
  createCoursePlanningFormGroup(coursePlanning?: CoursePlanningFormGroupInput): CoursePlanningFormGroup {
    const coursePlanningRawValue = {
      ...this.getFormDefaults(),
      ...(coursePlanning ?? { id: null }),
    };
    return new FormGroup<CoursePlanningFormGroupContent>({
      id: new FormControl(
        { value: coursePlanningRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      stateCoursePlanning: new FormControl(coursePlanningRawValue.stateCoursePlanning, {
        validators: [Validators.required],
      }),
      course: new FormControl(coursePlanningRawValue.course, {
        validators: [Validators.required],
      }),
      planning: new FormControl(coursePlanningRawValue.planning, {
        validators: [Validators.required],
      }),
    });
  }

  getCoursePlanning(form: CoursePlanningFormGroup): ICoursePlanning | NewCoursePlanning {
    return form.getRawValue() as ICoursePlanning | NewCoursePlanning;
  }

  resetForm(form: CoursePlanningFormGroup, coursePlanning: CoursePlanningFormGroupInput): void {
    const coursePlanningRawValue = { ...this.getFormDefaults(), ...coursePlanning };
    form.reset({
      ...coursePlanningRawValue,
      id: { value: coursePlanningRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): CoursePlanningFormDefaults {
    return {
      id: null,
    };
  }
}
