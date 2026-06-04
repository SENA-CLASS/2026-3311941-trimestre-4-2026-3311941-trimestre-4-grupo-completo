import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IGroupResponse, NewGroupResponse } from '../group-response.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGroupResponse for edit and NewGroupResponseFormGroupInput for create.
 */
type GroupResponseFormGroupInput = IGroupResponse | PartialWithRequiredKeyOf<NewGroupResponse>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IGroupResponse | NewGroupResponse> = Omit<T, 'evaluationDate'> & {
  evaluationDate?: string | null;
};

type GroupResponseFormRawValue = FormValueOf<IGroupResponse>;

type NewGroupResponseFormRawValue = FormValueOf<NewGroupResponse>;

type GroupResponseFormDefaults = Pick<NewGroupResponse, 'id' | 'evaluationDate'>;

type GroupResponseFormGroupContent = {
  id: FormControl<GroupResponseFormRawValue['id'] | NewGroupResponse['id']>;
  evaluationDate: FormControl<GroupResponseFormRawValue['evaluationDate']>;
  projectGroup: FormControl<GroupResponseFormRawValue['projectGroup']>;
  assessment: FormControl<GroupResponseFormRawValue['assessment']>;
  itemList: FormControl<GroupResponseFormRawValue['itemList']>;
};

export type GroupResponseFormGroup = FormGroup<GroupResponseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GroupResponseFormService {
  createGroupResponseFormGroup(groupResponse?: GroupResponseFormGroupInput): GroupResponseFormGroup {
    const groupResponseRawValue = this.convertGroupResponseToGroupResponseRawValue({
      ...this.getFormDefaults(),
      ...(groupResponse ?? { id: null }),
    });
    return new FormGroup<GroupResponseFormGroupContent>({
      id: new FormControl(
        { value: groupResponseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      evaluationDate: new FormControl(groupResponseRawValue.evaluationDate, {
        validators: [Validators.required],
      }),
      projectGroup: new FormControl(groupResponseRawValue.projectGroup, {
        validators: [Validators.required],
      }),
      assessment: new FormControl(groupResponseRawValue.assessment, {
        validators: [Validators.required],
      }),
      itemList: new FormControl(groupResponseRawValue.itemList, {
        validators: [Validators.required],
      }),
    });
  }

  getGroupResponse(form: GroupResponseFormGroup): IGroupResponse | NewGroupResponse {
    return this.convertGroupResponseRawValueToGroupResponse(form.getRawValue() as GroupResponseFormRawValue | NewGroupResponseFormRawValue);
  }

  resetForm(form: GroupResponseFormGroup, groupResponse: GroupResponseFormGroupInput): void {
    const groupResponseRawValue = this.convertGroupResponseToGroupResponseRawValue({ ...this.getFormDefaults(), ...groupResponse });
    form.reset({
      ...groupResponseRawValue,
      id: { value: groupResponseRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): GroupResponseFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      evaluationDate: currentTime,
    };
  }

  private convertGroupResponseRawValueToGroupResponse(
    rawGroupResponse: GroupResponseFormRawValue | NewGroupResponseFormRawValue,
  ): IGroupResponse | NewGroupResponse {
    return {
      ...rawGroupResponse,
      evaluationDate: dayjs(rawGroupResponse.evaluationDate, DATE_TIME_FORMAT),
    };
  }

  private convertGroupResponseToGroupResponseRawValue(
    groupResponse: IGroupResponse | (Partial<NewGroupResponse> & GroupResponseFormDefaults),
  ): GroupResponseFormRawValue | PartialWithRequiredKeyOf<NewGroupResponseFormRawValue> {
    return {
      ...groupResponse,
      evaluationDate: groupResponse.evaluationDate ? groupResponse.evaluationDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
