import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICourseTrimester, NewCourseTrimester } from '../course-trimester.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICourseTrimester for edit and NewCourseTrimesterFormGroupInput for create.
 */
type CourseTrimesterFormGroupInput = ICourseTrimester | PartialWithRequiredKeyOf<NewCourseTrimester>;

type CourseTrimesterFormDefaults = Pick<NewCourseTrimester, 'id'>;

type CourseTrimesterFormGroupContent = {
  id: FormControl<ICourseTrimester['id'] | NewCourseTrimester['id']>;
  course: FormControl<ICourseTrimester['course']>;
  trimester: FormControl<ICourseTrimester['trimester']>;
};

export type CourseTrimesterFormGroup = FormGroup<CourseTrimesterFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CourseTrimesterFormService {
  createCourseTrimesterFormGroup(courseTrimester?: CourseTrimesterFormGroupInput): CourseTrimesterFormGroup {
    const courseTrimesterRawValue = {
      ...this.getFormDefaults(),
      ...(courseTrimester ?? { id: null }),
    };
    return new FormGroup<CourseTrimesterFormGroupContent>({
      id: new FormControl(
        { value: courseTrimesterRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      course: new FormControl(courseTrimesterRawValue.course, {
        validators: [Validators.required],
      }),
      trimester: new FormControl(courseTrimesterRawValue.trimester, {
        validators: [Validators.required],
      }),
    });
  }

  getCourseTrimester(form: CourseTrimesterFormGroup): ICourseTrimester | NewCourseTrimester {
    return form.getRawValue();
  }

  resetForm(form: CourseTrimesterFormGroup, courseTrimester: CourseTrimesterFormGroupInput): void {
    const courseTrimesterRawValue = { ...this.getFormDefaults(), ...courseTrimester };
    form.reset({
      ...courseTrimesterRawValue,
      id: { value: courseTrimesterRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): CourseTrimesterFormDefaults {
    return {
      id: null,
    };
  }
}
