import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITrainingStatus, NewTrainingStatus } from '../training-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITrainingStatus for edit and NewTrainingStatusFormGroupInput for create.
 */
type TrainingStatusFormGroupInput = ITrainingStatus | PartialWithRequiredKeyOf<NewTrainingStatus>;

type TrainingStatusFormDefaults = Pick<NewTrainingStatus, 'id'>;

type TrainingStatusFormGroupContent = {
  id: FormControl<ITrainingStatus['id'] | NewTrainingStatus['id']>;
  statusName: FormControl<ITrainingStatus['statusName']>;
  stateTraining: FormControl<ITrainingStatus['stateTraining']>;
};

export type TrainingStatusFormGroup = FormGroup<TrainingStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TrainingStatusFormService {
  createTrainingStatusFormGroup(trainingStatus?: TrainingStatusFormGroupInput): TrainingStatusFormGroup {
    const trainingStatusRawValue = {
      ...this.getFormDefaults(),
      ...(trainingStatus ?? { id: null }),
    };
    return new FormGroup<TrainingStatusFormGroupContent>({
      id: new FormControl(
        { value: trainingStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      statusName: new FormControl(trainingStatusRawValue.statusName, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      stateTraining: new FormControl(trainingStatusRawValue.stateTraining, {
        validators: [Validators.required],
      }),
    });
  }

  getTrainingStatus(form: TrainingStatusFormGroup): ITrainingStatus | NewTrainingStatus {
    return form.getRawValue();
  }

  resetForm(form: TrainingStatusFormGroup, trainingStatus: TrainingStatusFormGroupInput): void {
    const trainingStatusRawValue = { ...this.getFormDefaults(), ...trainingStatus };
    form.reset({
      ...trainingStatusRawValue,
      id: { value: trainingStatusRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): TrainingStatusFormDefaults {
    return {
      id: null,
    };
  }
}
