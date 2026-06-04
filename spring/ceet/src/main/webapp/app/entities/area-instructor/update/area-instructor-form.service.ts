import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAreaInstructor, NewAreaInstructor } from '../area-instructor.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAreaInstructor for edit and NewAreaInstructorFormGroupInput for create.
 */
type AreaInstructorFormGroupInput = IAreaInstructor | PartialWithRequiredKeyOf<NewAreaInstructor>;

type AreaInstructorFormDefaults = Pick<NewAreaInstructor, 'id'>;

type AreaInstructorFormGroupContent = {
  id: FormControl<IAreaInstructor['id'] | NewAreaInstructor['id']>;
  areaInstructorState: FormControl<IAreaInstructor['areaInstructorState']>;
  area: FormControl<IAreaInstructor['area']>;
  instructor: FormControl<IAreaInstructor['instructor']>;
};

export type AreaInstructorFormGroup = FormGroup<AreaInstructorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AreaInstructorFormService {
  createAreaInstructorFormGroup(areaInstructor?: AreaInstructorFormGroupInput): AreaInstructorFormGroup {
    const areaInstructorRawValue = {
      ...this.getFormDefaults(),
      ...(areaInstructor ?? { id: null }),
    };
    return new FormGroup<AreaInstructorFormGroupContent>({
      id: new FormControl(
        { value: areaInstructorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      areaInstructorState: new FormControl(areaInstructorRawValue.areaInstructorState, {
        validators: [Validators.required],
      }),
      area: new FormControl(areaInstructorRawValue.area, {
        validators: [Validators.required],
      }),
      instructor: new FormControl(areaInstructorRawValue.instructor, {
        validators: [Validators.required],
      }),
    });
  }

  getAreaInstructor(form: AreaInstructorFormGroup): IAreaInstructor | NewAreaInstructor {
    return form.getRawValue() as IAreaInstructor | NewAreaInstructor;
  }

  resetForm(form: AreaInstructorFormGroup, areaInstructor: AreaInstructorFormGroupInput): void {
    const areaInstructorRawValue = { ...this.getFormDefaults(), ...areaInstructor };
    form.reset({
      ...areaInstructorRawValue,
      id: { value: areaInstructorRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): AreaInstructorFormDefaults {
    return {
      id: null,
    };
  }
}
