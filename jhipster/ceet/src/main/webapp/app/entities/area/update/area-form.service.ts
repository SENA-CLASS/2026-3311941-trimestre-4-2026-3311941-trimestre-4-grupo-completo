import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IArea, NewArea } from '../area.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IArea for edit and NewAreaFormGroupInput for create.
 */
type AreaFormGroupInput = IArea | PartialWithRequiredKeyOf<NewArea>;

type AreaFormDefaults = Pick<NewArea, 'id'>;

type AreaFormGroupContent = {
  id: FormControl<IArea['id'] | NewArea['id']>;
  areaName: FormControl<IArea['areaName']>;
  urlLogo: FormControl<IArea['urlLogo']>;
  areaState: FormControl<IArea['areaState']>;
};

export type AreaFormGroup = FormGroup<AreaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AreaFormService {
  createAreaFormGroup(area?: AreaFormGroupInput): AreaFormGroup {
    const areaRawValue = {
      ...this.getFormDefaults(),
      ...(area ?? { id: null }),
    };
    return new FormGroup<AreaFormGroupContent>({
      id: new FormControl(
        { value: areaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      areaName: new FormControl(areaRawValue.areaName, {
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      urlLogo: new FormControl(areaRawValue.urlLogo, {
        validators: [Validators.maxLength(1000)],
      }),
      areaState: new FormControl(areaRawValue.areaState, {
        validators: [Validators.required],
      }),
    });
  }

  getArea(form: AreaFormGroup): IArea | NewArea {
    return form.getRawValue();
  }

  resetForm(form: AreaFormGroup, area: AreaFormGroupInput): void {
    const areaRawValue = { ...this.getFormDefaults(), ...area };
    form.reset({
      ...areaRawValue,
      id: { value: areaRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): AreaFormDefaults {
    return {
      id: null,
    };
  }
}
