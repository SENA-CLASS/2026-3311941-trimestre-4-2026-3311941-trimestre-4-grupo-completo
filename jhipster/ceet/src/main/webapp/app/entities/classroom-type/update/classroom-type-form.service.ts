import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IClassroomType, NewClassroomType } from '../classroom-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClassroomType for edit and NewClassroomTypeFormGroupInput for create.
 */
type ClassroomTypeFormGroupInput = IClassroomType | PartialWithRequiredKeyOf<NewClassroomType>;

type ClassroomTypeFormDefaults = Pick<NewClassroomType, 'id'>;

type ClassroomTypeFormGroupContent = {
  id: FormControl<IClassroomType['id'] | NewClassroomType['id']>;
  typeClassroom: FormControl<IClassroomType['typeClassroom']>;
  classroomDescription: FormControl<IClassroomType['classroomDescription']>;
  classroomState: FormControl<IClassroomType['classroomState']>;
};

export type ClassroomTypeFormGroup = FormGroup<ClassroomTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClassroomTypeFormService {
  createClassroomTypeFormGroup(classroomType?: ClassroomTypeFormGroupInput): ClassroomTypeFormGroup {
    const classroomTypeRawValue = {
      ...this.getFormDefaults(),
      ...(classroomType ?? { id: null }),
    };
    return new FormGroup<ClassroomTypeFormGroupContent>({
      id: new FormControl(
        { value: classroomTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      typeClassroom: new FormControl(classroomTypeRawValue.typeClassroom, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      classroomDescription: new FormControl(classroomTypeRawValue.classroomDescription, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      classroomState: new FormControl(classroomTypeRawValue.classroomState, {
        validators: [Validators.required],
      }),
    });
  }

  getClassroomType(form: ClassroomTypeFormGroup): IClassroomType | NewClassroomType {
    return form.getRawValue();
  }

  resetForm(form: ClassroomTypeFormGroup, classroomType: ClassroomTypeFormGroupInput): void {
    const classroomTypeRawValue = { ...this.getFormDefaults(), ...classroomType };
    form.reset({
      ...classroomTypeRawValue,
      id: { value: classroomTypeRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ClassroomTypeFormDefaults {
    return {
      id: null,
    };
  }
}
