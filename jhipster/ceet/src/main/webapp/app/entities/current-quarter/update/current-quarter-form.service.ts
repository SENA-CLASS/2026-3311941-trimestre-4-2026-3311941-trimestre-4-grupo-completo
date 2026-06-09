import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICurrentQuarter, NewCurrentQuarter } from '../current-quarter.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICurrentQuarter for edit and NewCurrentQuarterFormGroupInput for create.
 */
type CurrentQuarterFormGroupInput = ICurrentQuarter | PartialWithRequiredKeyOf<NewCurrentQuarter>;

type CurrentQuarterFormDefaults = Pick<NewCurrentQuarter, 'id'>;

type CurrentQuarterFormGroupContent = {
  id: FormControl<ICurrentQuarter['id'] | NewCurrentQuarter['id']>;
  scheduledQuarter: FormControl<ICurrentQuarter['scheduledQuarter']>;
  startQuarter: FormControl<ICurrentQuarter['startQuarter']>;
  endQuarter: FormControl<ICurrentQuarter['endQuarter']>;
  currentQuarterState: FormControl<ICurrentQuarter['currentQuarterState']>;
  year: FormControl<ICurrentQuarter['year']>;
};

export type CurrentQuarterFormGroup = FormGroup<CurrentQuarterFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CurrentQuarterFormService {
  createCurrentQuarterFormGroup(currentQuarter?: CurrentQuarterFormGroupInput): CurrentQuarterFormGroup {
    const currentQuarterRawValue = {
      ...this.getFormDefaults(),
      ...(currentQuarter ?? { id: null }),
    };
    return new FormGroup<CurrentQuarterFormGroupContent>({
      id: new FormControl(
        { value: currentQuarterRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      scheduledQuarter: new FormControl(currentQuarterRawValue.scheduledQuarter, {
        validators: [Validators.required],
      }),
      startQuarter: new FormControl(currentQuarterRawValue.startQuarter, {
        validators: [Validators.required],
      }),
      endQuarter: new FormControl(currentQuarterRawValue.endQuarter, {
        validators: [Validators.required],
      }),
      currentQuarterState: new FormControl(currentQuarterRawValue.currentQuarterState, {
        validators: [Validators.required],
      }),
      year: new FormControl(currentQuarterRawValue.year, {
        validators: [Validators.required],
      }),
    });
  }

  getCurrentQuarter(form: CurrentQuarterFormGroup): ICurrentQuarter | NewCurrentQuarter {
    return form.getRawValue();
  }

  resetForm(form: CurrentQuarterFormGroup, currentQuarter: CurrentQuarterFormGroupInput): void {
    const currentQuarterRawValue = { ...this.getFormDefaults(), ...currentQuarter };
    form.reset({
      ...currentQuarterRawValue,
      id: { value: currentQuarterRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): CurrentQuarterFormDefaults {
    return {
      id: null,
    };
  }
}
