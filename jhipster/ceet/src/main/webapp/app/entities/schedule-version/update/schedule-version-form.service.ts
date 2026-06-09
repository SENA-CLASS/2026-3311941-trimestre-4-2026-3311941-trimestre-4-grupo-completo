import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IScheduleVersion, NewScheduleVersion } from '../schedule-version.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IScheduleVersion for edit and NewScheduleVersionFormGroupInput for create.
 */
type ScheduleVersionFormGroupInput = IScheduleVersion | PartialWithRequiredKeyOf<NewScheduleVersion>;

type ScheduleVersionFormDefaults = Pick<NewScheduleVersion, 'id'>;

type ScheduleVersionFormGroupContent = {
  id: FormControl<IScheduleVersion['id'] | NewScheduleVersion['id']>;
  versionNumber: FormControl<IScheduleVersion['versionNumber']>;
  versionState: FormControl<IScheduleVersion['versionState']>;
  currentQuarter: FormControl<IScheduleVersion['currentQuarter']>;
};

export type ScheduleVersionFormGroup = FormGroup<ScheduleVersionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ScheduleVersionFormService {
  createScheduleVersionFormGroup(scheduleVersion?: ScheduleVersionFormGroupInput): ScheduleVersionFormGroup {
    const scheduleVersionRawValue = {
      ...this.getFormDefaults(),
      ...(scheduleVersion ?? { id: null }),
    };
    return new FormGroup<ScheduleVersionFormGroupContent>({
      id: new FormControl(
        { value: scheduleVersionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      versionNumber: new FormControl(scheduleVersionRawValue.versionNumber, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      versionState: new FormControl(scheduleVersionRawValue.versionState, {
        validators: [Validators.required],
      }),
      currentQuarter: new FormControl(scheduleVersionRawValue.currentQuarter, {
        validators: [Validators.required],
      }),
    });
  }

  getScheduleVersion(form: ScheduleVersionFormGroup): IScheduleVersion | NewScheduleVersion {
    return form.getRawValue();
  }

  resetForm(form: ScheduleVersionFormGroup, scheduleVersion: ScheduleVersionFormGroupInput): void {
    const scheduleVersionRawValue = { ...this.getFormDefaults(), ...scheduleVersion };
    form.reset({
      ...scheduleVersionRawValue,
      id: { value: scheduleVersionRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ScheduleVersionFormDefaults {
    return {
      id: null,
    };
  }
}
