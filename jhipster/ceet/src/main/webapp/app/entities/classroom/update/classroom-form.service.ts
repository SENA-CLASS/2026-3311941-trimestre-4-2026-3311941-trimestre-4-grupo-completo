import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IClassroom, NewClassroom } from '../classroom.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClassroom for edit and NewClassroomFormGroupInput for create.
 */
type ClassroomFormGroupInput = IClassroom | PartialWithRequiredKeyOf<NewClassroom>;

type ClassroomFormDefaults = Pick<NewClassroom, 'id'>;

type ClassroomFormGroupContent = {
  id: FormControl<IClassroom['id'] | NewClassroom['id']>;
  classroomNumber: FormControl<IClassroom['classroomNumber']>;
  classroomDescription: FormControl<IClassroom['classroomDescription']>;
  classroomState: FormControl<IClassroom['classroomState']>;
  limitation: FormControl<IClassroom['limitation']>;
  classroomType: FormControl<IClassroom['classroomType']>;
  campus: FormControl<IClassroom['campus']>;
};

export type ClassroomFormGroup = FormGroup<ClassroomFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClassroomFormService {
  createClassroomFormGroup(classroom?: ClassroomFormGroupInput): ClassroomFormGroup {
    const classroomRawValue = {
      ...this.getFormDefaults(),
      ...(classroom ?? { id: null }),
    };
    return new FormGroup<ClassroomFormGroupContent>({
      id: new FormControl(
        { value: classroomRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      classroomNumber: new FormControl(classroomRawValue.classroomNumber, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      classroomDescription: new FormControl(classroomRawValue.classroomDescription, {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      classroomState: new FormControl(classroomRawValue.classroomState, {
        validators: [Validators.required],
      }),
      limitation: new FormControl(classroomRawValue.limitation, {
        validators: [Validators.required],
      }),
      classroomType: new FormControl(classroomRawValue.classroomType, {
        validators: [Validators.required],
      }),
      campus: new FormControl(classroomRawValue.campus, {
        validators: [Validators.required],
      }),
    });
  }

  getClassroom(form: ClassroomFormGroup): IClassroom | NewClassroom {
    return form.getRawValue();
  }

  resetForm(form: ClassroomFormGroup, classroom: ClassroomFormGroupInput): void {
    const classroomRawValue = { ...this.getFormDefaults(), ...classroom };
    form.reset({
      ...classroomRawValue,
      id: { value: classroomRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ClassroomFormDefaults {
    return {
      id: null,
    };
  }
}
