import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IBondingInstructor, NewBondingInstructor } from '../bonding-instructor.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBondingInstructor for edit and NewBondingInstructorFormGroupInput for create.
 */
type BondingInstructorFormGroupInput = IBondingInstructor | PartialWithRequiredKeyOf<NewBondingInstructor>;

type BondingInstructorFormDefaults = Pick<NewBondingInstructor, 'id'>;

type BondingInstructorFormGroupContent = {
  id: FormControl<IBondingInstructor['id'] | NewBondingInstructor['id']>;
  startTime: FormControl<IBondingInstructor['startTime']>;
  endTime: FormControl<IBondingInstructor['endTime']>;
  year: FormControl<IBondingInstructor['year']>;
  instructor: FormControl<IBondingInstructor['instructor']>;
  bonding: FormControl<IBondingInstructor['bonding']>;
};

export type BondingInstructorFormGroup = FormGroup<BondingInstructorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BondingInstructorFormService {
  createBondingInstructorFormGroup(bondingInstructor?: BondingInstructorFormGroupInput): BondingInstructorFormGroup {
    const bondingInstructorRawValue = {
      ...this.getFormDefaults(),
      ...(bondingInstructor ?? { id: null }),
    };
    return new FormGroup<BondingInstructorFormGroupContent>({
      id: new FormControl(
        { value: bondingInstructorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      startTime: new FormControl(bondingInstructorRawValue.startTime, {
        validators: [Validators.required],
      }),
      endTime: new FormControl(bondingInstructorRawValue.endTime, {
        validators: [Validators.required],
      }),
      year: new FormControl(bondingInstructorRawValue.year, {
        validators: [Validators.required],
      }),
      instructor: new FormControl(bondingInstructorRawValue.instructor, {
        validators: [Validators.required],
      }),
      bonding: new FormControl(bondingInstructorRawValue.bonding, {
        validators: [Validators.required],
      }),
    });
  }

  getBondingInstructor(form: BondingInstructorFormGroup): IBondingInstructor | NewBondingInstructor {
    return form.getRawValue();
  }

  resetForm(form: BondingInstructorFormGroup, bondingInstructor: BondingInstructorFormGroupInput): void {
    const bondingInstructorRawValue = { ...this.getFormDefaults(), ...bondingInstructor };
    form.reset({
      ...bondingInstructorRawValue,
      id: { value: bondingInstructorRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): BondingInstructorFormDefaults {
    return {
      id: null,
    };
  }
}
