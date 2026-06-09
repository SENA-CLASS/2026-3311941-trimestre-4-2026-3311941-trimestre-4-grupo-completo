import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IInstructorWorkingDay, NewInstructorWorkingDay } from '../instructor-working-day.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstructorWorkingDay for edit and NewInstructorWorkingDayFormGroupInput for create.
 */
type InstructorWorkingDayFormGroupInput = IInstructorWorkingDay | PartialWithRequiredKeyOf<NewInstructorWorkingDay>;

type InstructorWorkingDayFormDefaults = Pick<NewInstructorWorkingDay, 'id'>;

type InstructorWorkingDayFormGroupContent = {
  id: FormControl<IInstructorWorkingDay['id'] | NewInstructorWorkingDay['id']>;
  nameWorkingDay: FormControl<IInstructorWorkingDay['nameWorkingDay']>;
  descriptionWorkingDay: FormControl<IInstructorWorkingDay['descriptionWorkingDay']>;
  workingDayState: FormControl<IInstructorWorkingDay['workingDayState']>;
};

export type InstructorWorkingDayFormGroup = FormGroup<InstructorWorkingDayFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstructorWorkingDayFormService {
  createInstructorWorkingDayFormGroup(instructorWorkingDay?: InstructorWorkingDayFormGroupInput): InstructorWorkingDayFormGroup {
    const instructorWorkingDayRawValue = {
      ...this.getFormDefaults(),
      ...(instructorWorkingDay ?? { id: null }),
    };
    return new FormGroup<InstructorWorkingDayFormGroupContent>({
      id: new FormControl(
        { value: instructorWorkingDayRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nameWorkingDay: new FormControl(instructorWorkingDayRawValue.nameWorkingDay, {
        validators: [Validators.required, Validators.maxLength(80)],
      }),
      descriptionWorkingDay: new FormControl(instructorWorkingDayRawValue.descriptionWorkingDay, {
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      workingDayState: new FormControl(instructorWorkingDayRawValue.workingDayState, {
        validators: [Validators.required],
      }),
    });
  }

  getInstructorWorkingDay(form: InstructorWorkingDayFormGroup): IInstructorWorkingDay | NewInstructorWorkingDay {
    return form.getRawValue();
  }

  resetForm(form: InstructorWorkingDayFormGroup, instructorWorkingDay: InstructorWorkingDayFormGroupInput): void {
    const instructorWorkingDayRawValue = { ...this.getFormDefaults(), ...instructorWorkingDay };
    form.reset({
      ...instructorWorkingDayRawValue,
      id: { value: instructorWorkingDayRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): InstructorWorkingDayFormDefaults {
    return {
      id: null,
    };
  }
}
