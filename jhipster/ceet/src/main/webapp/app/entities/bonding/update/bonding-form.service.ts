import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IBonding, NewBonding } from '../bonding.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBonding for edit and NewBondingFormGroupInput for create.
 */
type BondingFormGroupInput = IBonding | PartialWithRequiredKeyOf<NewBonding>;

type BondingFormDefaults = Pick<NewBonding, 'id'>;

type BondingFormGroupContent = {
  id: FormControl<IBonding['id'] | NewBonding['id']>;
  bondingType: FormControl<IBonding['bondingType']>;
  workingHours: FormControl<IBonding['workingHours']>;
  bondingState: FormControl<IBonding['bondingState']>;
};

export type BondingFormGroup = FormGroup<BondingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BondingFormService {
  createBondingFormGroup(bonding?: BondingFormGroupInput): BondingFormGroup {
    const bondingRawValue = {
      ...this.getFormDefaults(),
      ...(bonding ?? { id: null }),
    };
    return new FormGroup<BondingFormGroupContent>({
      id: new FormControl(
        { value: bondingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      bondingType: new FormControl(bondingRawValue.bondingType, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      workingHours: new FormControl(bondingRawValue.workingHours, {
        validators: [Validators.required],
      }),
      bondingState: new FormControl(bondingRawValue.bondingState, {
        validators: [Validators.required],
      }),
    });
  }

  getBonding(form: BondingFormGroup): IBonding | NewBonding {
    return form.getRawValue();
  }

  resetForm(form: BondingFormGroup, bonding: BondingFormGroupInput): void {
    const bondingRawValue = { ...this.getFormDefaults(), ...bonding };
    form.reset({
      ...bondingRawValue,
      id: { value: bondingRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): BondingFormDefaults {
    return {
      id: null,
    };
  }
}
