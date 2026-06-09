import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IBoundingSchedule, NewBoundingSchedule } from '../bounding-schedule.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBoundingSchedule for edit and NewBoundingScheduleFormGroupInput for create.
 */
type BoundingScheduleFormGroupInput = IBoundingSchedule | PartialWithRequiredKeyOf<NewBoundingSchedule>;

type BoundingScheduleFormDefaults = Pick<NewBoundingSchedule, 'id'>;

type BoundingScheduleFormGroupContent = {
  id: FormControl<IBoundingSchedule['id'] | NewBoundingSchedule['id']>;
  bondingInstructor: FormControl<IBoundingSchedule['bondingInstructor']>;
  instructorWorkingDay: FormControl<IBoundingSchedule['instructorWorkingDay']>;
};

export type BoundingScheduleFormGroup = FormGroup<BoundingScheduleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BoundingScheduleFormService {
  createBoundingScheduleFormGroup(boundingSchedule?: BoundingScheduleFormGroupInput): BoundingScheduleFormGroup {
    const boundingScheduleRawValue = {
      ...this.getFormDefaults(),
      ...(boundingSchedule ?? { id: null }),
    };
    return new FormGroup<BoundingScheduleFormGroupContent>({
      id: new FormControl(
        { value: boundingScheduleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      bondingInstructor: new FormControl(boundingScheduleRawValue.bondingInstructor, {
        validators: [Validators.required],
      }),
      instructorWorkingDay: new FormControl(boundingScheduleRawValue.instructorWorkingDay, {
        validators: [Validators.required],
      }),
    });
  }

  getBoundingSchedule(form: BoundingScheduleFormGroup): IBoundingSchedule | NewBoundingSchedule {
    return form.getRawValue();
  }

  resetForm(form: BoundingScheduleFormGroup, boundingSchedule: BoundingScheduleFormGroupInput): void {
    const boundingScheduleRawValue = { ...this.getFormDefaults(), ...boundingSchedule };
    form.reset({
      ...boundingScheduleRawValue,
      id: { value: boundingScheduleRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): BoundingScheduleFormDefaults {
    return {
      id: null,
    };
  }
}
