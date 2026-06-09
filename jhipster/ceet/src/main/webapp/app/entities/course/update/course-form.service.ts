import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICourse, NewCourse } from '../course.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICourse for edit and NewCourseFormGroupInput for create.
 */
type CourseFormGroupInput = ICourse | PartialWithRequiredKeyOf<NewCourse>;

type CourseFormDefaults = Pick<NewCourse, 'id'>;

type CourseFormGroupContent = {
  id: FormControl<ICourse['id'] | NewCourse['id']>;
  courseNumber: FormControl<ICourse['courseNumber']>;
  startDate: FormControl<ICourse['startDate']>;
  endDate: FormControl<ICourse['endDate']>;
  route: FormControl<ICourse['route']>;
  courseStatus: FormControl<ICourse['courseStatus']>;
  workingDayCourse: FormControl<ICourse['workingDayCourse']>;
  trainingProgram: FormControl<ICourse['trainingProgram']>;
};

export type CourseFormGroup = FormGroup<CourseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CourseFormService {
  createCourseFormGroup(course?: CourseFormGroupInput): CourseFormGroup {
    const courseRawValue = {
      ...this.getFormDefaults(),
      ...(course ?? { id: null }),
    };
    return new FormGroup<CourseFormGroupContent>({
      id: new FormControl(
        { value: courseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      courseNumber: new FormControl(courseRawValue.courseNumber, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      startDate: new FormControl(courseRawValue.startDate, {
        validators: [Validators.required],
      }),
      endDate: new FormControl(courseRawValue.endDate, {
        validators: [Validators.required],
      }),
      route: new FormControl(courseRawValue.route, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      courseStatus: new FormControl(courseRawValue.courseStatus, {
        validators: [Validators.required],
      }),
      workingDayCourse: new FormControl(courseRawValue.workingDayCourse, {
        validators: [Validators.required],
      }),
      trainingProgram: new FormControl(courseRawValue.trainingProgram, {
        validators: [Validators.required],
      }),
    });
  }

  getCourse(form: CourseFormGroup): ICourse | NewCourse {
    return form.getRawValue();
  }

  resetForm(form: CourseFormGroup, course: CourseFormGroupInput): void {
    const courseRawValue = { ...this.getFormDefaults(), ...course };
    form.reset({
      ...courseRawValue,
      id: { value: courseRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): CourseFormDefaults {
    return {
      id: null,
    };
  }
}
