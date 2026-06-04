import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IClassroomLimitation, NewClassroomLimitation } from '../classroom-limitation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClassroomLimitation for edit and NewClassroomLimitationFormGroupInput for create.
 */
type ClassroomLimitationFormGroupInput = IClassroomLimitation | PartialWithRequiredKeyOf<NewClassroomLimitation>;

type ClassroomLimitationFormDefaults = Pick<NewClassroomLimitation, 'id'>;

type ClassroomLimitationFormGroupContent = {
  id: FormControl<IClassroomLimitation['id'] | NewClassroomLimitation['id']>;
  classroom: FormControl<IClassroomLimitation['classroom']>;
  learningResult: FormControl<IClassroomLimitation['learningResult']>;
};

export type ClassroomLimitationFormGroup = FormGroup<ClassroomLimitationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClassroomLimitationFormService {
  createClassroomLimitationFormGroup(classroomLimitation?: ClassroomLimitationFormGroupInput): ClassroomLimitationFormGroup {
    const classroomLimitationRawValue = {
      ...this.getFormDefaults(),
      ...(classroomLimitation ?? { id: null }),
    };
    return new FormGroup<ClassroomLimitationFormGroupContent>({
      id: new FormControl(
        { value: classroomLimitationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      classroom: new FormControl(classroomLimitationRawValue.classroom, {
        validators: [Validators.required],
      }),
      learningResult: new FormControl(classroomLimitationRawValue.learningResult, {
        validators: [Validators.required],
      }),
    });
  }

  getClassroomLimitation(form: ClassroomLimitationFormGroup): IClassroomLimitation | NewClassroomLimitation {
    return form.getRawValue() as IClassroomLimitation | NewClassroomLimitation;
  }

  resetForm(form: ClassroomLimitationFormGroup, classroomLimitation: ClassroomLimitationFormGroupInput): void {
    const classroomLimitationRawValue = { ...this.getFormDefaults(), ...classroomLimitation };
    form.reset({
      ...classroomLimitationRawValue,
      id: { value: classroomLimitationRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ClassroomLimitationFormDefaults {
    return {
      id: null,
    };
  }
}
