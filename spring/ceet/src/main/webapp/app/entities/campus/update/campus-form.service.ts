import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICampus, NewCampus } from '../campus.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICampus for edit and NewCampusFormGroupInput for create.
 */
type CampusFormGroupInput = ICampus | PartialWithRequiredKeyOf<NewCampus>;

type CampusFormDefaults = Pick<NewCampus, 'id'>;

type CampusFormGroupContent = {
  id: FormControl<ICampus['id'] | NewCampus['id']>;
  campusName: FormControl<ICampus['campusName']>;
  campusAddress: FormControl<ICampus['campusAddress']>;
  campusState: FormControl<ICampus['campusState']>;
};

export type CampusFormGroup = FormGroup<CampusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CampusFormService {
  createCampusFormGroup(campus?: CampusFormGroupInput): CampusFormGroup {
    const campusRawValue = {
      ...this.getFormDefaults(),
      ...(campus ?? { id: null }),
    };
    return new FormGroup<CampusFormGroupContent>({
      id: new FormControl(
        { value: campusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      campusName: new FormControl(campusRawValue.campusName, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      campusAddress: new FormControl(campusRawValue.campusAddress, {
        validators: [Validators.required, Validators.maxLength(400)],
      }),
      campusState: new FormControl(campusRawValue.campusState, {
        validators: [Validators.required],
      }),
    });
  }

  getCampus(form: CampusFormGroup): ICampus | NewCampus {
    return form.getRawValue() as ICampus | NewCampus;
  }

  resetForm(form: CampusFormGroup, campus: CampusFormGroupInput): void {
    const campusRawValue = { ...this.getFormDefaults(), ...campus };
    form.reset({
      ...campusRawValue,
      id: { value: campusRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): CampusFormDefaults {
    return {
      id: null,
    };
  }
}
