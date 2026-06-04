import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITrimester, NewTrimester } from '../trimester.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITrimester for edit and NewTrimesterFormGroupInput for create.
 */
type TrimesterFormGroupInput = ITrimester | PartialWithRequiredKeyOf<NewTrimester>;

type TrimesterFormDefaults = Pick<NewTrimester, 'id'>;

type TrimesterFormGroupContent = {
  id: FormControl<ITrimester['id'] | NewTrimester['id']>;
  trimesterName: FormControl<ITrimester['trimesterName']>;
  trimesterState: FormControl<ITrimester['trimesterState']>;
  workingDayCourse: FormControl<ITrimester['workingDayCourse']>;
  levelEducations: FormControl<ITrimester['levelEducations']>;
};

export type TrimesterFormGroup = FormGroup<TrimesterFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TrimesterFormService {
  createTrimesterFormGroup(trimester?: TrimesterFormGroupInput): TrimesterFormGroup {
    const trimesterRawValue = {
      ...this.getFormDefaults(),
      ...(trimester ?? { id: null }),
    };
    return new FormGroup<TrimesterFormGroupContent>({
      id: new FormControl(
        { value: trimesterRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      trimesterName: new FormControl(trimesterRawValue.trimesterName, {
        validators: [Validators.required],
      }),
      trimesterState: new FormControl(trimesterRawValue.trimesterState),
      workingDayCourse: new FormControl(trimesterRawValue.workingDayCourse, {
        validators: [Validators.required],
      }),
      levelEducations: new FormControl(trimesterRawValue.levelEducations, {
        validators: [Validators.required],
      }),
    });
  }

  getTrimester(form: TrimesterFormGroup): ITrimester | NewTrimester {
    return form.getRawValue() as ITrimester | NewTrimester;
  }

  resetForm(form: TrimesterFormGroup, trimester: TrimesterFormGroupInput): void {
    const trimesterRawValue = { ...this.getFormDefaults(), ...trimester };
    form.reset({
      ...trimesterRawValue,
      id: { value: trimesterRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): TrimesterFormDefaults {
    return {
      id: null,
    };
  }
}
