import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IWorkingDay, NewWorkingDay } from '../working-day.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWorkingDay for edit and NewWorkingDayFormGroupInput for create.
 */
type WorkingDayFormGroupInput = IWorkingDay | PartialWithRequiredKeyOf<NewWorkingDay>;

type WorkingDayFormDefaults = Pick<NewWorkingDay, 'id'>;

type WorkingDayFormGroupContent = {
  id: FormControl<IWorkingDay['id'] | NewWorkingDay['id']>;
  startTime: FormControl<IWorkingDay['startTime']>;
  endTime: FormControl<IWorkingDay['endTime']>;
  instructorWorkingDay: FormControl<IWorkingDay['instructorWorkingDay']>;
  day: FormControl<IWorkingDay['day']>;
};

export type WorkingDayFormGroup = FormGroup<WorkingDayFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WorkingDayFormService {
  createWorkingDayFormGroup(workingDay?: WorkingDayFormGroupInput): WorkingDayFormGroup {
    const workingDayRawValue = {
      ...this.getFormDefaults(),
      ...(workingDay ?? { id: null }),
    };
    return new FormGroup<WorkingDayFormGroupContent>({
      id: new FormControl(
        { value: workingDayRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      startTime: new FormControl(workingDayRawValue.startTime, {
        validators: [Validators.required],
      }),
      endTime: new FormControl(workingDayRawValue.endTime, {
        validators: [Validators.required],
      }),
      instructorWorkingDay: new FormControl(workingDayRawValue.instructorWorkingDay, {
        validators: [Validators.required],
      }),
      day: new FormControl(workingDayRawValue.day, {
        validators: [Validators.required],
      }),
    });
  }

  getWorkingDay(form: WorkingDayFormGroup): IWorkingDay | NewWorkingDay {
    return form.getRawValue() as IWorkingDay | NewWorkingDay;
  }

  resetForm(form: WorkingDayFormGroup, workingDay: WorkingDayFormGroupInput): void {
    const workingDayRawValue = { ...this.getFormDefaults(), ...workingDay };
    form.reset({
      ...workingDayRawValue,
      id: { value: workingDayRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): WorkingDayFormDefaults {
    return {
      id: null,
    };
  }
}
