import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICheckList, NewCheckList } from '../check-list.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICheckList for edit and NewCheckListFormGroupInput for create.
 */
type CheckListFormGroupInput = ICheckList | PartialWithRequiredKeyOf<NewCheckList>;

type CheckListFormDefaults = Pick<NewCheckList, 'id'>;

type CheckListFormGroupContent = {
  id: FormControl<ICheckList['id'] | NewCheckList['id']>;
  listName: FormControl<ICheckList['listName']>;
  listState: FormControl<ICheckList['listState']>;
  trainingProgram: FormControl<ICheckList['trainingProgram']>;
};

export type CheckListFormGroup = FormGroup<CheckListFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CheckListFormService {
  createCheckListFormGroup(checkList?: CheckListFormGroupInput): CheckListFormGroup {
    const checkListRawValue = {
      ...this.getFormDefaults(),
      ...(checkList ?? { id: null }),
    };
    return new FormGroup<CheckListFormGroupContent>({
      id: new FormControl(
        { value: checkListRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      listName: new FormControl(checkListRawValue.listName, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      listState: new FormControl(checkListRawValue.listState, {
        validators: [Validators.required],
      }),
      trainingProgram: new FormControl(checkListRawValue.trainingProgram, {
        validators: [Validators.required],
      }),
    });
  }

  getCheckList(form: CheckListFormGroup): ICheckList | NewCheckList {
    return form.getRawValue();
  }

  resetForm(form: CheckListFormGroup, checkList: CheckListFormGroupInput): void {
    const checkListRawValue = { ...this.getFormDefaults(), ...checkList };
    form.reset({
      ...checkListRawValue,
      id: { value: checkListRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): CheckListFormDefaults {
    return {
      id: null,
    };
  }
}
