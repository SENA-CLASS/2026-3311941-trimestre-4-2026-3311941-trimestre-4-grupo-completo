import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IMemberGroup, NewMemberGroup } from '../member-group.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMemberGroup for edit and NewMemberGroupFormGroupInput for create.
 */
type MemberGroupFormGroupInput = IMemberGroup | PartialWithRequiredKeyOf<NewMemberGroup>;

type MemberGroupFormDefaults = Pick<NewMemberGroup, 'id'>;

type MemberGroupFormGroupContent = {
  id: FormControl<IMemberGroup['id'] | NewMemberGroup['id']>;
  projectGroup: FormControl<IMemberGroup['projectGroup']>;
  apprentice: FormControl<IMemberGroup['apprentice']>;
};

export type MemberGroupFormGroup = FormGroup<MemberGroupFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MemberGroupFormService {
  createMemberGroupFormGroup(memberGroup?: MemberGroupFormGroupInput): MemberGroupFormGroup {
    const memberGroupRawValue = {
      ...this.getFormDefaults(),
      ...(memberGroup ?? { id: null }),
    };
    return new FormGroup<MemberGroupFormGroupContent>({
      id: new FormControl(
        { value: memberGroupRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      projectGroup: new FormControl(memberGroupRawValue.projectGroup, {
        validators: [Validators.required],
      }),
      apprentice: new FormControl(memberGroupRawValue.apprentice, {
        validators: [Validators.required],
      }),
    });
  }

  getMemberGroup(form: MemberGroupFormGroup): IMemberGroup | NewMemberGroup {
    return form.getRawValue();
  }

  resetForm(form: MemberGroupFormGroup, memberGroup: MemberGroupFormGroupInput): void {
    const memberGroupRawValue = { ...this.getFormDefaults(), ...memberGroup };
    form.reset({
      ...memberGroupRawValue,
      id: { value: memberGroupRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): MemberGroupFormDefaults {
    return {
      id: null,
    };
  }
}
