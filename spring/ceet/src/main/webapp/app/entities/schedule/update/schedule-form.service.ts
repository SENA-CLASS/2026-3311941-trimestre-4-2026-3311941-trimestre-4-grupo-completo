import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISchedule, NewSchedule } from '../schedule.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISchedule for edit and NewScheduleFormGroupInput for create.
 */
type ScheduleFormGroupInput = ISchedule | PartialWithRequiredKeyOf<NewSchedule>;

type ScheduleFormDefaults = Pick<NewSchedule, 'id'>;

type ScheduleFormGroupContent = {
  id: FormControl<ISchedule['id'] | NewSchedule['id']>;
  startTime: FormControl<ISchedule['startTime']>;
  endTime: FormControl<ISchedule['endTime']>;
  scheduleVersion: FormControl<ISchedule['scheduleVersion']>;
  modality: FormControl<ISchedule['modality']>;
  day: FormControl<ISchedule['day']>;
  courseTrimester: FormControl<ISchedule['courseTrimester']>;
  classroom: FormControl<ISchedule['classroom']>;
  instructor: FormControl<ISchedule['instructor']>;
};

export type ScheduleFormGroup = FormGroup<ScheduleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ScheduleFormService {
  createScheduleFormGroup(schedule?: ScheduleFormGroupInput): ScheduleFormGroup {
    const scheduleRawValue = {
      ...this.getFormDefaults(),
      ...(schedule ?? { id: null }),
    };
    return new FormGroup<ScheduleFormGroupContent>({
      id: new FormControl(
        { value: scheduleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      startTime: new FormControl(scheduleRawValue.startTime, {
        validators: [Validators.required],
      }),
      endTime: new FormControl(scheduleRawValue.endTime, {
        validators: [Validators.required],
      }),
      scheduleVersion: new FormControl(scheduleRawValue.scheduleVersion, {
        validators: [Validators.required],
      }),
      modality: new FormControl(scheduleRawValue.modality, {
        validators: [Validators.required],
      }),
      day: new FormControl(scheduleRawValue.day, {
        validators: [Validators.required],
      }),
      courseTrimester: new FormControl(scheduleRawValue.courseTrimester, {
        validators: [Validators.required],
      }),
      classroom: new FormControl(scheduleRawValue.classroom, {
        validators: [Validators.required],
      }),
      instructor: new FormControl(scheduleRawValue.instructor, {
        validators: [Validators.required],
      }),
    });
  }

  getSchedule(form: ScheduleFormGroup): ISchedule | NewSchedule {
    return form.getRawValue() as ISchedule | NewSchedule;
  }

  resetForm(form: ScheduleFormGroup, schedule: ScheduleFormGroupInput): void {
    const scheduleRawValue = { ...this.getFormDefaults(), ...schedule };
    form.reset({
      ...scheduleRawValue,
      id: { value: scheduleRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ScheduleFormDefaults {
    return {
      id: null,
    };
  }
}
