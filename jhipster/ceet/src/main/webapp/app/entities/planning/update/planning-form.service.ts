import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPlanning, NewPlanning } from '../planning.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlanning for edit and NewPlanningFormGroupInput for create.
 */
type PlanningFormGroupInput = IPlanning | PartialWithRequiredKeyOf<NewPlanning>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPlanning | NewPlanning> = Omit<T, 'planningDate'> & {
  planningDate?: string | null;
};

type PlanningFormRawValue = FormValueOf<IPlanning>;

type NewPlanningFormRawValue = FormValueOf<NewPlanning>;

type PlanningFormDefaults = Pick<NewPlanning, 'id' | 'planningDate'>;

type PlanningFormGroupContent = {
  id: FormControl<PlanningFormRawValue['id'] | NewPlanning['id']>;
  planningCode: FormControl<PlanningFormRawValue['planningCode']>;
  planningDate: FormControl<PlanningFormRawValue['planningDate']>;
  planningState: FormControl<PlanningFormRawValue['planningState']>;
};

export type PlanningFormGroup = FormGroup<PlanningFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlanningFormService {
  createPlanningFormGroup(planning?: PlanningFormGroupInput): PlanningFormGroup {
    const planningRawValue = this.convertPlanningToPlanningRawValue({
      ...this.getFormDefaults(),
      ...(planning ?? { id: null }),
    });
    return new FormGroup<PlanningFormGroupContent>({
      id: new FormControl(
        { value: planningRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      planningCode: new FormControl(planningRawValue.planningCode, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      planningDate: new FormControl(planningRawValue.planningDate, {
        validators: [Validators.required],
      }),
      planningState: new FormControl(planningRawValue.planningState, {
        validators: [Validators.required],
      }),
    });
  }

  getPlanning(form: PlanningFormGroup): IPlanning | NewPlanning {
    return this.convertPlanningRawValueToPlanning(form.getRawValue());
  }

  resetForm(form: PlanningFormGroup, planning: PlanningFormGroupInput): void {
    const planningRawValue = this.convertPlanningToPlanningRawValue({ ...this.getFormDefaults(), ...planning });
    form.reset({
      ...planningRawValue,
      id: { value: planningRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): PlanningFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      planningDate: currentTime,
    };
  }

  private convertPlanningRawValueToPlanning(rawPlanning: PlanningFormRawValue | NewPlanningFormRawValue): IPlanning | NewPlanning {
    return {
      ...rawPlanning,
      planningDate: dayjs(rawPlanning.planningDate, DATE_TIME_FORMAT),
    };
  }

  private convertPlanningToPlanningRawValue(
    planning: IPlanning | (Partial<NewPlanning> & PlanningFormDefaults),
  ): PlanningFormRawValue | PartialWithRequiredKeyOf<NewPlanningFormRawValue> {
    return {
      ...planning,
      planningDate: planning.planningDate ? planning.planningDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
