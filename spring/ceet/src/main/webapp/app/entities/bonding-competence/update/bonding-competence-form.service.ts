import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IBondingCompetence, NewBondingCompetence } from '../bonding-competence.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBondingCompetence for edit and NewBondingCompetenceFormGroupInput for create.
 */
type BondingCompetenceFormGroupInput = IBondingCompetence | PartialWithRequiredKeyOf<NewBondingCompetence>;

type BondingCompetenceFormDefaults = Pick<NewBondingCompetence, 'id'>;

type BondingCompetenceFormGroupContent = {
  id: FormControl<IBondingCompetence['id'] | NewBondingCompetence['id']>;
  bondingInstructor: FormControl<IBondingCompetence['bondingInstructor']>;
  learningCompetence: FormControl<IBondingCompetence['learningCompetence']>;
};

export type BondingCompetenceFormGroup = FormGroup<BondingCompetenceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BondingCompetenceFormService {
  createBondingCompetenceFormGroup(bondingCompetence?: BondingCompetenceFormGroupInput): BondingCompetenceFormGroup {
    const bondingCompetenceRawValue = {
      ...this.getFormDefaults(),
      ...(bondingCompetence ?? { id: null }),
    };
    return new FormGroup<BondingCompetenceFormGroupContent>({
      id: new FormControl(
        { value: bondingCompetenceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      bondingInstructor: new FormControl(bondingCompetenceRawValue.bondingInstructor, {
        validators: [Validators.required],
      }),
      learningCompetence: new FormControl(bondingCompetenceRawValue.learningCompetence, {
        validators: [Validators.required],
      }),
    });
  }

  getBondingCompetence(form: BondingCompetenceFormGroup): IBondingCompetence | NewBondingCompetence {
    return form.getRawValue() as IBondingCompetence | NewBondingCompetence;
  }

  resetForm(form: BondingCompetenceFormGroup, bondingCompetence: BondingCompetenceFormGroupInput): void {
    const bondingCompetenceRawValue = { ...this.getFormDefaults(), ...bondingCompetence };
    form.reset({
      ...bondingCompetenceRawValue,
      id: { value: bondingCompetenceRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): BondingCompetenceFormDefaults {
    return {
      id: null,
    };
  }
}
