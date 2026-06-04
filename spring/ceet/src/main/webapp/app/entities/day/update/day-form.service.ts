import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDay, NewDay } from '../day.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDay for edit and NewDayFormGroupInput for create.
 */
type DayFormGroupInput = IDay | PartialWithRequiredKeyOf<NewDay>;

type DayFormDefaults = Pick<NewDay, 'id'>;

type DayFormGroupContent = {
  id: FormControl<IDay['id'] | NewDay['id']>;
  dayName: FormControl<IDay['dayName']>;
  dayState: FormControl<IDay['dayState']>;
};

export type DayFormGroup = FormGroup<DayFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DayFormService {
  createDayFormGroup(day?: DayFormGroupInput): DayFormGroup {
    const dayRawValue = {
      ...this.getFormDefaults(),
      ...(day ?? { id: null }),
    };
    return new FormGroup<DayFormGroupContent>({
      id: new FormControl(
        { value: dayRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dayName: new FormControl(dayRawValue.dayName, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      dayState: new FormControl(dayRawValue.dayState, {
        validators: [Validators.required],
      }),
    });
  }

  getDay(form: DayFormGroup): IDay | NewDay {
    return form.getRawValue() as IDay | NewDay;
  }

  resetForm(form: DayFormGroup, day: DayFormGroupInput): void {
    const dayRawValue = { ...this.getFormDefaults(), ...day };
    form.reset({
      ...dayRawValue,
      id: { value: dayRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): DayFormDefaults {
    return {
      id: null,
    };
  }
}
