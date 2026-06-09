import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITrainingProgram, NewTrainingProgram } from '../training-program.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITrainingProgram for edit and NewTrainingProgramFormGroupInput for create.
 */
type TrainingProgramFormGroupInput = ITrainingProgram | PartialWithRequiredKeyOf<NewTrainingProgram>;

type TrainingProgramFormDefaults = Pick<NewTrainingProgram, 'id'>;

type TrainingProgramFormGroupContent = {
  id: FormControl<ITrainingProgram['id'] | NewTrainingProgram['id']>;
  programCode: FormControl<ITrainingProgram['programCode']>;
  programVersion: FormControl<ITrainingProgram['programVersion']>;
  programName: FormControl<ITrainingProgram['programName']>;
  programInitials: FormControl<ITrainingProgram['programInitials']>;
  programState: FormControl<ITrainingProgram['programState']>;
  levelEducation: FormControl<ITrainingProgram['levelEducation']>;
};

export type TrainingProgramFormGroup = FormGroup<TrainingProgramFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TrainingProgramFormService {
  createTrainingProgramFormGroup(trainingProgram?: TrainingProgramFormGroupInput): TrainingProgramFormGroup {
    const trainingProgramRawValue = {
      ...this.getFormDefaults(),
      ...(trainingProgram ?? { id: null }),
    };
    return new FormGroup<TrainingProgramFormGroupContent>({
      id: new FormControl(
        { value: trainingProgramRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      programCode: new FormControl(trainingProgramRawValue.programCode, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      programVersion: new FormControl(trainingProgramRawValue.programVersion, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      programName: new FormControl(trainingProgramRawValue.programName, {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      programInitials: new FormControl(trainingProgramRawValue.programInitials, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      programState: new FormControl(trainingProgramRawValue.programState, {
        validators: [Validators.required],
      }),
      levelEducation: new FormControl(trainingProgramRawValue.levelEducation, {
        validators: [Validators.required],
      }),
    });
  }

  getTrainingProgram(form: TrainingProgramFormGroup): ITrainingProgram | NewTrainingProgram {
    return form.getRawValue();
  }

  resetForm(form: TrainingProgramFormGroup, trainingProgram: TrainingProgramFormGroupInput): void {
    const trainingProgramRawValue = { ...this.getFormDefaults(), ...trainingProgram };
    form.reset({
      ...trainingProgramRawValue,
      id: { value: trainingProgramRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): TrainingProgramFormDefaults {
    return {
      id: null,
    };
  }
}
