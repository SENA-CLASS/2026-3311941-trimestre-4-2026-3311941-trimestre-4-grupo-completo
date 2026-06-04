import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IInstructor, NewInstructor } from '../instructor.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstructor for edit and NewInstructorFormGroupInput for create.
 */
type InstructorFormGroupInput = IInstructor | PartialWithRequiredKeyOf<NewInstructor>;

type InstructorFormDefaults = Pick<NewInstructor, 'id'>;

type InstructorFormGroupContent = {
  id: FormControl<IInstructor['id'] | NewInstructor['id']>;
  instructorState: FormControl<IInstructor['instructorState']>;
  customer: FormControl<IInstructor['customer']>;
};

export type InstructorFormGroup = FormGroup<InstructorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstructorFormService {
  createInstructorFormGroup(instructor?: InstructorFormGroupInput): InstructorFormGroup {
    const instructorRawValue = {
      ...this.getFormDefaults(),
      ...(instructor ?? { id: null }),
    };
    return new FormGroup<InstructorFormGroupContent>({
      id: new FormControl(
        { value: instructorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      instructorState: new FormControl(instructorRawValue.instructorState, {
        validators: [Validators.required],
      }),
      customer: new FormControl(instructorRawValue.customer, {
        validators: [Validators.required],
      }),
    });
  }

  getInstructor(form: InstructorFormGroup): IInstructor | NewInstructor {
    return form.getRawValue() as IInstructor | NewInstructor;
  }

  resetForm(form: InstructorFormGroup, instructor: InstructorFormGroupInput): void {
    const instructorRawValue = { ...this.getFormDefaults(), ...instructor };
    form.reset({
      ...instructorRawValue,
      id: { value: instructorRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): InstructorFormDefaults {
    return {
      id: null,
    };
  }
}
