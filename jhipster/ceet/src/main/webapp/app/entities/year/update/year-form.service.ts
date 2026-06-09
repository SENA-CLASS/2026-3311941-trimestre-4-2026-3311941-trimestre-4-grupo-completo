import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IYear, NewYear } from '../year.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IYear for edit and NewYearFormGroupInput for create.
 */
type YearFormGroupInput = IYear | PartialWithRequiredKeyOf<NewYear>;

type YearFormDefaults = Pick<NewYear, 'id'>;

type YearFormGroupContent = {
  id: FormControl<IYear['id'] | NewYear['id']>;
  yearNumber: FormControl<IYear['yearNumber']>;
  yearState: FormControl<IYear['yearState']>;
};

export type YearFormGroup = FormGroup<YearFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class YearFormService {
  createYearFormGroup(year?: YearFormGroupInput): YearFormGroup {
    const yearRawValue = {
      ...this.getFormDefaults(),
      ...(year ?? { id: null }),
    };
    return new FormGroup<YearFormGroupContent>({
      id: new FormControl(
        { value: yearRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      yearNumber: new FormControl(yearRawValue.yearNumber, {
        validators: [Validators.required],
      }),
      yearState: new FormControl(yearRawValue.yearState, {
        validators: [Validators.required],
      }),
    });
  }

  getYear(form: YearFormGroup): IYear | NewYear {
    return form.getRawValue();
  }

  resetForm(form: YearFormGroup, year: YearFormGroupInput): void {
    const yearRawValue = { ...this.getFormDefaults(), ...year };
    form.reset({
      ...yearRawValue,
      id: { value: yearRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): YearFormDefaults {
    return {
      id: null,
    };
  }
}
