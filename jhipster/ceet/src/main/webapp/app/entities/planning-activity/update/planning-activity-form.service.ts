import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IPlanningActivity, NewPlanningActivity } from '../planning-activity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlanningActivity for edit and NewPlanningActivityFormGroupInput for create.
 */
type PlanningActivityFormGroupInput = IPlanningActivity | PartialWithRequiredKeyOf<NewPlanningActivity>;

type PlanningActivityFormDefaults = Pick<NewPlanningActivity, 'id'>;

type PlanningActivityFormGroupContent = {
  id: FormControl<IPlanningActivity['id'] | NewPlanningActivity['id']>;
  quarterSchedule: FormControl<IPlanningActivity['quarterSchedule']>;
  projectActivity: FormControl<IPlanningActivity['projectActivity']>;
};

export type PlanningActivityFormGroup = FormGroup<PlanningActivityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlanningActivityFormService {
  createPlanningActivityFormGroup(planningActivity?: PlanningActivityFormGroupInput): PlanningActivityFormGroup {
    const planningActivityRawValue = {
      ...this.getFormDefaults(),
      ...(planningActivity ?? { id: null }),
    };
    return new FormGroup<PlanningActivityFormGroupContent>({
      id: new FormControl(
        { value: planningActivityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      quarterSchedule: new FormControl(planningActivityRawValue.quarterSchedule, {
        validators: [Validators.required],
      }),
      projectActivity: new FormControl(planningActivityRawValue.projectActivity, {
        validators: [Validators.required],
      }),
    });
  }

  getPlanningActivity(form: PlanningActivityFormGroup): IPlanningActivity | NewPlanningActivity {
    return form.getRawValue();
  }

  resetForm(form: PlanningActivityFormGroup, planningActivity: PlanningActivityFormGroupInput): void {
    const planningActivityRawValue = { ...this.getFormDefaults(), ...planningActivity };
    form.reset({
      ...planningActivityRawValue,
      id: { value: planningActivityRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): PlanningActivityFormDefaults {
    return {
      id: null,
    };
  }
}
