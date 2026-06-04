import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICourseStatus, NewCourseStatus } from '../course-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICourseStatus for edit and NewCourseStatusFormGroupInput for create.
 */
type CourseStatusFormGroupInput = ICourseStatus | PartialWithRequiredKeyOf<NewCourseStatus>;

type CourseStatusFormDefaults = Pick<NewCourseStatus, 'id'>;

type CourseStatusFormGroupContent = {
  id: FormControl<ICourseStatus['id'] | NewCourseStatus['id']>;
  nameCourseStatus: FormControl<ICourseStatus['nameCourseStatus']>;
  stateCourse: FormControl<ICourseStatus['stateCourse']>;
};

export type CourseStatusFormGroup = FormGroup<CourseStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CourseStatusFormService {
  createCourseStatusFormGroup(courseStatus?: CourseStatusFormGroupInput): CourseStatusFormGroup {
    const courseStatusRawValue = {
      ...this.getFormDefaults(),
      ...(courseStatus ?? { id: null }),
    };
    return new FormGroup<CourseStatusFormGroupContent>({
      id: new FormControl(
        { value: courseStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nameCourseStatus: new FormControl(courseStatusRawValue.nameCourseStatus, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      stateCourse: new FormControl(courseStatusRawValue.stateCourse, {
        validators: [Validators.required],
      }),
    });
  }

  getCourseStatus(form: CourseStatusFormGroup): ICourseStatus | NewCourseStatus {
    return form.getRawValue() as ICourseStatus | NewCourseStatus;
  }

  resetForm(form: CourseStatusFormGroup, courseStatus: CourseStatusFormGroupInput): void {
    const courseStatusRawValue = { ...this.getFormDefaults(), ...courseStatus };
    form.reset({
      ...courseStatusRawValue,
      id: { value: courseStatusRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): CourseStatusFormDefaults {
    return {
      id: null,
    };
  }
}
