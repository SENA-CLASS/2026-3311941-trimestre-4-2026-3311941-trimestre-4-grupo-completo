import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ILevelEducation, NewLevelEducation } from '../level-education.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILevelEducation for edit and NewLevelEducationFormGroupInput for create.
 */
type LevelEducationFormGroupInput = ILevelEducation | PartialWithRequiredKeyOf<NewLevelEducation>;

type LevelEducationFormDefaults = Pick<NewLevelEducation, 'id'>;

type LevelEducationFormGroupContent = {
  id: FormControl<ILevelEducation['id'] | NewLevelEducation['id']>;
  levelName: FormControl<ILevelEducation['levelName']>;
  stateLevelEducation: FormControl<ILevelEducation['stateLevelEducation']>;
};

export type LevelEducationFormGroup = FormGroup<LevelEducationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LevelEducationFormService {
  createLevelEducationFormGroup(levelEducation?: LevelEducationFormGroupInput): LevelEducationFormGroup {
    const levelEducationRawValue = {
      ...this.getFormDefaults(),
      ...(levelEducation ?? { id: null }),
    };
    return new FormGroup<LevelEducationFormGroupContent>({
      id: new FormControl(
        { value: levelEducationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      levelName: new FormControl(levelEducationRawValue.levelName, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      stateLevelEducation: new FormControl(levelEducationRawValue.stateLevelEducation, {
        validators: [Validators.required],
      }),
    });
  }

  getLevelEducation(form: LevelEducationFormGroup): ILevelEducation | NewLevelEducation {
    return form.getRawValue();
  }

  resetForm(form: LevelEducationFormGroup, levelEducation: LevelEducationFormGroupInput): void {
    const levelEducationRawValue = { ...this.getFormDefaults(), ...levelEducation };
    form.reset({
      ...levelEducationRawValue,
      id: { value: levelEducationRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): LevelEducationFormDefaults {
    return {
      id: null,
    };
  }
}
