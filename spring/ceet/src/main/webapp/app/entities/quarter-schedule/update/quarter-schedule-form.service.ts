import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IQuarterSchedule, NewQuarterSchedule } from '../quarter-schedule.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuarterSchedule for edit and NewQuarterScheduleFormGroupInput for create.
 */
type QuarterScheduleFormGroupInput = IQuarterSchedule | PartialWithRequiredKeyOf<NewQuarterSchedule>;

type QuarterScheduleFormDefaults = Pick<NewQuarterSchedule, 'id'>;

type QuarterScheduleFormGroupContent = {
  id: FormControl<IQuarterSchedule['id'] | NewQuarterSchedule['id']>;
  learningResult: FormControl<IQuarterSchedule['learningResult']>;
  planning: FormControl<IQuarterSchedule['planning']>;
  trimester: FormControl<IQuarterSchedule['trimester']>;
};

export type QuarterScheduleFormGroup = FormGroup<QuarterScheduleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuarterScheduleFormService {
  createQuarterScheduleFormGroup(quarterSchedule?: QuarterScheduleFormGroupInput): QuarterScheduleFormGroup {
    const quarterScheduleRawValue = {
      ...this.getFormDefaults(),
      ...(quarterSchedule ?? { id: null }),
    };
    return new FormGroup<QuarterScheduleFormGroupContent>({
      id: new FormControl(
        { value: quarterScheduleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      learningResult: new FormControl(quarterScheduleRawValue.learningResult, {
        validators: [Validators.required],
      }),
      planning: new FormControl(quarterScheduleRawValue.planning, {
        validators: [Validators.required],
      }),
      trimester: new FormControl(quarterScheduleRawValue.trimester, {
        validators: [Validators.required],
      }),
    });
  }

  getQuarterSchedule(form: QuarterScheduleFormGroup): IQuarterSchedule | NewQuarterSchedule {
    return form.getRawValue() as IQuarterSchedule | NewQuarterSchedule;
  }

  resetForm(form: QuarterScheduleFormGroup, quarterSchedule: QuarterScheduleFormGroupInput): void {
    const quarterScheduleRawValue = { ...this.getFormDefaults(), ...quarterSchedule };
    form.reset({
      ...quarterScheduleRawValue,
      id: { value: quarterScheduleRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): QuarterScheduleFormDefaults {
    return {
      id: null,
    };
  }
}
