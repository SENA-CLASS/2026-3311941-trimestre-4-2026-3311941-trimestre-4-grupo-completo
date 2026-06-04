import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICheckListCourse, NewCheckListCourse } from '../check-list-course.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICheckListCourse for edit and NewCheckListCourseFormGroupInput for create.
 */
type CheckListCourseFormGroupInput = ICheckListCourse | PartialWithRequiredKeyOf<NewCheckListCourse>;

type CheckListCourseFormDefaults = Pick<NewCheckListCourse, 'id'>;

type CheckListCourseFormGroupContent = {
  id: FormControl<ICheckListCourse['id'] | NewCheckListCourse['id']>;
  checkListState: FormControl<ICheckListCourse['checkListState']>;
  course: FormControl<ICheckListCourse['course']>;
  checkList: FormControl<ICheckListCourse['checkList']>;
};

export type CheckListCourseFormGroup = FormGroup<CheckListCourseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CheckListCourseFormService {
  createCheckListCourseFormGroup(checkListCourse?: CheckListCourseFormGroupInput): CheckListCourseFormGroup {
    const checkListCourseRawValue = {
      ...this.getFormDefaults(),
      ...(checkListCourse ?? { id: null }),
    };
    return new FormGroup<CheckListCourseFormGroupContent>({
      id: new FormControl(
        { value: checkListCourseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      checkListState: new FormControl(checkListCourseRawValue.checkListState, {
        validators: [Validators.required],
      }),
      course: new FormControl(checkListCourseRawValue.course, {
        validators: [Validators.required],
      }),
      checkList: new FormControl(checkListCourseRawValue.checkList, {
        validators: [Validators.required],
      }),
    });
  }

  getCheckListCourse(form: CheckListCourseFormGroup): ICheckListCourse | NewCheckListCourse {
    return form.getRawValue() as ICheckListCourse | NewCheckListCourse;
  }

  resetForm(form: CheckListCourseFormGroup, checkListCourse: CheckListCourseFormGroupInput): void {
    const checkListCourseRawValue = { ...this.getFormDefaults(), ...checkListCourse };
    form.reset({
      ...checkListCourseRawValue,
      id: { value: checkListCourseRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): CheckListCourseFormDefaults {
    return {
      id: null,
    };
  }
}
