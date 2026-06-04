import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IWorkingDayCourse, NewWorkingDayCourse } from '../working-day-course.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWorkingDayCourse for edit and NewWorkingDayCourseFormGroupInput for create.
 */
type WorkingDayCourseFormGroupInput = IWorkingDayCourse | PartialWithRequiredKeyOf<NewWorkingDayCourse>;

type WorkingDayCourseFormDefaults = Pick<NewWorkingDayCourse, 'id'>;

type WorkingDayCourseFormGroupContent = {
  id: FormControl<IWorkingDayCourse['id'] | NewWorkingDayCourse['id']>;
  workingDayAcronym: FormControl<IWorkingDayCourse['workingDayAcronym']>;
  workingDayName: FormControl<IWorkingDayCourse['workingDayName']>;
  description: FormControl<IWorkingDayCourse['description']>;
  imageUrl: FormControl<IWorkingDayCourse['imageUrl']>;
  stateWorkingDay: FormControl<IWorkingDayCourse['stateWorkingDay']>;
};

export type WorkingDayCourseFormGroup = FormGroup<WorkingDayCourseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WorkingDayCourseFormService {
  createWorkingDayCourseFormGroup(workingDayCourse?: WorkingDayCourseFormGroupInput): WorkingDayCourseFormGroup {
    const workingDayCourseRawValue = {
      ...this.getFormDefaults(),
      ...(workingDayCourse ?? { id: null }),
    };
    return new FormGroup<WorkingDayCourseFormGroupContent>({
      id: new FormControl(
        { value: workingDayCourseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      workingDayAcronym: new FormControl(workingDayCourseRawValue.workingDayAcronym, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      workingDayName: new FormControl(workingDayCourseRawValue.workingDayName, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      description: new FormControl(workingDayCourseRawValue.description, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      imageUrl: new FormControl(workingDayCourseRawValue.imageUrl, {
        validators: [Validators.maxLength(100)],
      }),
      stateWorkingDay: new FormControl(workingDayCourseRawValue.stateWorkingDay, {
        validators: [Validators.required],
      }),
    });
  }

  getWorkingDayCourse(form: WorkingDayCourseFormGroup): IWorkingDayCourse | NewWorkingDayCourse {
    return form.getRawValue() as IWorkingDayCourse | NewWorkingDayCourse;
  }

  resetForm(form: WorkingDayCourseFormGroup, workingDayCourse: WorkingDayCourseFormGroupInput): void {
    const workingDayCourseRawValue = { ...this.getFormDefaults(), ...workingDayCourse };
    form.reset({
      ...workingDayCourseRawValue,
      id: { value: workingDayCourseRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): WorkingDayCourseFormDefaults {
    return {
      id: null,
    };
  }
}
