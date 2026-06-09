import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IApprentice, NewApprentice } from '../apprentice.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IApprentice for edit and NewApprenticeFormGroupInput for create.
 */
type ApprenticeFormGroupInput = IApprentice | PartialWithRequiredKeyOf<NewApprentice>;

type ApprenticeFormDefaults = Pick<NewApprentice, 'id'>;

type ApprenticeFormGroupContent = {
  id: FormControl<IApprentice['id'] | NewApprentice['id']>;
  customer: FormControl<IApprentice['customer']>;
  trainingStatus: FormControl<IApprentice['trainingStatus']>;
  course: FormControl<IApprentice['course']>;
};

export type ApprenticeFormGroup = FormGroup<ApprenticeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ApprenticeFormService {
  createApprenticeFormGroup(apprentice?: ApprenticeFormGroupInput): ApprenticeFormGroup {
    const apprenticeRawValue = {
      ...this.getFormDefaults(),
      ...(apprentice ?? { id: null }),
    };
    return new FormGroup<ApprenticeFormGroupContent>({
      id: new FormControl(
        { value: apprenticeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      customer: new FormControl(apprenticeRawValue.customer, {
        validators: [Validators.required],
      }),
      trainingStatus: new FormControl(apprenticeRawValue.trainingStatus, {
        validators: [Validators.required],
      }),
      course: new FormControl(apprenticeRawValue.course, {
        validators: [Validators.required],
      }),
    });
  }

  getApprentice(form: ApprenticeFormGroup): IApprentice | NewApprentice {
    return form.getRawValue();
  }

  resetForm(form: ApprenticeFormGroup, apprentice: ApprenticeFormGroupInput): void {
    const apprenticeRawValue = { ...this.getFormDefaults(), ...apprentice };
    form.reset({
      ...apprenticeRawValue,
      id: { value: apprenticeRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ApprenticeFormDefaults {
    return {
      id: null,
    };
  }
}
